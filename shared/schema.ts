import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  currentPhase: integer("current_phase").notNull().default(1),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionTier: text("subscription_tier").notNull().default("free"),
  subscriptionStatus: text("subscription_status").notNull().default("inactive"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  isAdmin: boolean("is_admin").notNull().default(false),
  amountPaid: integer("amount_paid").default(0),
  currency: text("currency").default("usd"),
  paymentDate: timestamp("payment_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Lead capture and email marketing
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  source: text("source").notNull(), // 'landing_page', 'blog', 'pricing', etc.
  leadMagnet: text("lead_magnet"), // 'free_assessment', 'boundary_guide', etc.
  status: text("status").notNull().default("active"), // 'active', 'unsubscribed', 'bounced'
  emailSequence: text("email_sequence"), // 'lead_magnet', 'nurture', etc.
  lastEmailSent: timestamp("last_email_sent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  sequence: text("sequence").notNull(),
  sendAfterDays: integer("send_after_days").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const phases = pgTable("phases", {
  id: serial("id").primaryKey(),
  letter: text("letter").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  isLocked: boolean("is_locked").notNull().default(true),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  phaseId: integer("phase_id").notNull(),
  status: text("status").notNull(), // 'completed', 'in_progress', 'locked'
  exercisesCompleted: integer("exercises_completed").notNull().default(0),
  totalExercises: integer("total_exercises").notNull().default(0),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  phaseId: integer("phase_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(), // Flexible content structure
  type: text("type").notNull(), // 'assessment', 'reading', 'practice', 'reflection'
  order: integer("order").notNull(),
});

export const userExerciseProgress = pgTable("user_exercise_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  exerciseId: integer("exercise_id").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  responses: jsonb("responses"), // Store user responses/answers
  completedAt: timestamp("completed_at"),
});

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title"),
  content: text("content").notNull(),
  mood: text("mood"),
  energyLevel: integer("energy_level"),
  phaseId: integer("phase_id"),
  isPrivate: boolean("is_private").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'mindfulness', 'cbt', 'nlp', 'trauma', 'worksheets', 'videos'
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'exercise', 'worksheet', 'video', 'audio', 'reading'
  content: jsonb("content"), // Flexible content structure
  url: text("url"),
  phaseId: integer("phase_id"), // Optional: associate with specific phase
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  phaseId: integer("phase_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  questions: jsonb("questions").notNull(), // Array of question objects
  scoringRubric: jsonb("scoring_rubric"), // How to calculate/interpret scores
});

export const userAssessmentResults = pgTable("user_assessment_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  assessmentId: integer("assessment_id").notNull(),
  answers: jsonb("answers").notNull(),
  score: integer("score"),
  interpretation: text("interpretation"),
  completedAt: timestamp("completed_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPhaseSchema = createInsertSchema(phases).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  updatedAt: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
});

export const insertUserExerciseProgressSchema = createInsertSchema(userExerciseProgress).omit({
  id: true,
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
});

export const insertUserAssessmentResultSchema = createInsertSchema(userAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  author: text("author").notNull(), // Could link to users, but simple text for now is fine
  category: text("category").notNull(),
  tags: jsonb("tags").$type<string[]>(),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isPublished: boolean("is_published").notNull().default(false),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Phase = typeof phases.$inferSelect;
export type InsertPhase = z.infer<typeof insertPhaseSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type UserExerciseProgress = typeof userExerciseProgress.$inferSelect;
export type InsertUserExerciseProgress = z.infer<typeof insertUserExerciseProgressSchema>;

export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

export type UserAssessmentResult = typeof userAssessmentResults.$inferSelect;
export type InsertUserAssessmentResult = z.infer<typeof insertUserAssessmentResultSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// Session table for connect-pg-simple
export const sessions = pgTable("session", {
  sid: text("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});
