import "./config";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { db } from "./db";
import * as schema from "@shared/schema";
import { sql } from "drizzle-orm";

const DATA_DIR = path.resolve(process.cwd(), "database_data");

// Helper to safely parse dates from CSV strings
function parseDate(dateStr: string | undefined | null): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null; // Invalid date
  return date;
}

// Helper to safely parse dates, returning undefined if null (for defaults)
function parseDateOrUndefined(dateStr: string | undefined | null): Date | undefined {
  const date = parseDate(dateStr);
  return date === null ? undefined : date;
}

// Helper to safely parse JSON
function parseJson(jsonStr: string | undefined | null, fallback: any = {}) {
  if (!jsonStr || jsonStr.trim() === "") return fallback;
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.warn("⚠️ Invalid JSON:", jsonStr.substring(0, 50) + "...");
    return fallback;
  }
}

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // 1. Users
    await seedTable("users", schema.users, (row) => ({
      ...row,
      currentPhase: parseInt(row.current_phase || "1"),
      stripeCustomerId: row.stripe_customer_id || null,
      stripeSubscriptionId: row.stripe_subscription_id || null,
      subscriptionTier: row.subscription_tier || "free",
      subscriptionStatus: row.subscription_status || "inactive",
      subscriptionEndDate: parseDate(row.subscription_end_date),
      createdAt: parseDateOrUndefined(row.created_at) || new Date(),
    }));

    // 2. Phases
    await seedTable("phases", schema.phases, (row) => ({
      ...row,
      isLocked: row.is_locked === "true",
      order: parseInt(row.order),
    }));

    // 3. Exercises
    await seedTable("exercises", schema.exercises, (row) => ({
      ...row,
      phaseId: parseInt(row.phase_id),
      order: parseInt(row.order),
      content: parseJson(row.content, {}),
    }));

    // 4. Assessments
    await seedTable("assessments", schema.assessments, (row) => ({
      ...row,
      phaseId: parseInt(row.phase_id),
      questions: parseJson(row.questions, []),
      scoringRubric: row.scoring_rubric ? parseJson(row.scoring_rubric, null) : null,
    }));

    // 5. Resources
    await seedTable("resources", schema.resources, (row) => ({
      ...row,
      phaseId: row.phase_id ? parseInt(row.phase_id) : null,
      content: row.content ? parseJson(row.content, {}) : null,
    }));

    // 6. Leads
    await seedTable("leads", schema.leads, (row) => ({
      ...row,
      firstName: row.first_name || null,
      lastName: row.last_name || null,
      leadMagnet: row.lead_magnet || null,
      emailSequence: row.email_sequence || null,
      lastEmailSent: parseDate(row.last_email_sent),
      createdAt: parseDateOrUndefined(row.created_at) || new Date(),
    }));

    // 7. Email Campaigns
    await seedTable("email_campaigns", schema.emailCampaigns, (row) => ({
      ...row,
      sendAfterDays: parseInt(row.send_after_days || "0"),
      isActive: row.is_active === "true",
      createdAt: parseDateOrUndefined(row.created_at) || new Date(),
    }));

    // 8. User Progress
    await seedTable("user_progress", schema.userProgress, (row) => ({
      ...row,
      userId: parseInt(row.user_id),
      phaseId: parseInt(row.phase_id),
      exercisesCompleted: parseInt(row.exercises_completed || "0"),
      totalExercises: parseInt(row.total_exercises || "0"),
      completedAt: parseDate(row.completed_at),
      updatedAt: parseDateOrUndefined(row.updated_at) || new Date(),
    }));

    // 9. User Exercise Progress
    await seedTable("user_exercise_progress", schema.userExerciseProgress, (row) => ({
      ...row,
      userId: parseInt(row.user_id),
      exerciseId: parseInt(row.exercise_id),
      isCompleted: row.is_completed === "true",
      responses: row.responses ? parseJson(row.responses, {}) : null,
      completedAt: parseDate(row.completed_at),
    }));

    // 10. User Assessment Results
    await seedTable("user_assessment_results", schema.userAssessmentResults, (row) => ({
      ...row,
      userId: parseInt(row.user_id),
      assessmentId: parseInt(row.assessment_id),
      answers: parseJson(row.answers, {}),
      score: row.score ? parseInt(row.score) : null,
      completedAt: parseDateOrUndefined(row.completed_at) || new Date(),
    }));

    // 11. Journal Entries
    await seedTable("journal_entries", schema.journalEntries, (row) => ({
      ...row,
      userId: parseInt(row.user_id),
      energyLevel: row.energy_level ? parseInt(row.energy_level) : null,
      phaseId: row.phase_id ? parseInt(row.phase_id) : null,
      isPrivate: row.is_private === "true",
      createdAt: parseDateOrUndefined(row.created_at) || new Date(),
      updatedAt: parseDateOrUndefined(row.updated_at) || new Date(),
    }));

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

async function seedTable(tableName: string, tableSchema: any, transformer: (row: any) => any) {
  const filePath = path.join(DATA_DIR, `${tableName}.csv`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Skipping ${tableName}: File not found at ${filePath}`);
    return;
  }

  console.log(`Processing ${tableName}...`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // Use BOM: true to strip BOM if present, trim: true to whitespace around values
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  });

  if (records.length === 0) {
    console.log(`   No records found for ${tableName}.`);
    return;
  }

  const data = records.map(transformer);

  try {
    await db.insert(tableSchema).values(data).onConflictDoNothing();

    // Attempt to reset sequence - wrapped in try/catch to not fail the whole seed if it fails
    try {
      // Correct SQL for sequence reset
      await db.execute(sql`
        SELECT setval(pg_get_serial_sequence(${tableName}, 'id'), COALESCE((SELECT MAX(id) FROM ${tableSchema}) + 1, 1), false);
      `);
    } catch (seqError) {
      console.warn(`   ⚠️  Could not reset sequence for ${tableName}:`, seqError);
    }

    console.log(`   Seeded ${data.length} records into ${tableName}.`);
  } catch (error) {
    console.error(`   Error seeding ${tableName}:`, error);
    throw error;
  }
}

seed();