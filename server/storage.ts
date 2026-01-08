import type {
  User, InsertUser, Phase, InsertPhase, UserProgress, InsertUserProgress,
  Exercise, InsertExercise, UserExerciseProgress, InsertUserExerciseProgress,
  JournalEntry, InsertJournalEntry, Resource, InsertResource,
  Assessment, InsertAssessment, UserAssessmentResult, InsertUserAssessmentResult,
  Lead, InsertLead
} from "@shared/schema";


import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: session.Store;
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Phase operations
  getAllPhases(): Promise<Phase[]>;
  getPhase(id: number): Promise<Phase | undefined>;
  createPhase(phase: InsertPhase): Promise<Phase>;

  // User progress operations
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressForPhase(userId: number, phaseId: number): Promise<UserProgress | undefined>;
  updateUserProgress(userId: number, phaseId: number, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // Exercise operations
  getExercisesForPhase(phaseId: number): Promise<Exercise[]>;
  getExercise(id: number): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // User exercise progress operations
  getUserExerciseProgressForPhase(userId: number, phaseId: number): Promise<UserExerciseProgress[]>;
  getUserExerciseProgress(userId: number, exerciseId: number): Promise<UserExerciseProgress | undefined>;
  updateUserExerciseProgress(userId: number, exerciseId: number, updates: Partial<InsertUserExerciseProgress>): Promise<UserExerciseProgress | undefined>;
  createUserExerciseProgress(progress: InsertUserExerciseProgress): Promise<UserExerciseProgress>;

  // Journal operations
  getUserJournalEntries(userId: number): Promise<JournalEntry[]>;
  getJournalEntry(id: number): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: number, updates: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: number): Promise<boolean>;

  // Resource operations
  getAllResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;

  // Assessment operations
  getAssessmentsForPhase(phaseId: number): Promise<Assessment[]>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;

  // User assessment results
  getUserAssessmentResults(userId: number): Promise<UserAssessmentResult[]>;
  getUserAssessmentResult(userId: number, assessmentId: number): Promise<UserAssessmentResult | undefined>;
  createUserAssessmentResult(result: InsertUserAssessmentResult): Promise<UserAssessmentResult>;

  // Stripe and subscription operations
  updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string | null): Promise<User | undefined>;
  updateUserSubscription(userId: number, tier: string, status: string, endDate: Date | null): Promise<User | undefined>;
  getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | undefined>;

  // Lead capture operations
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadsBySource(source: string): Promise<Lead[]>;
}

import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  users, phases, userProgress, exercises, userExerciseProgress,
  journalEntries, resources, assessments, userAssessmentResults, leads
} from "@shared/schema";

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user || undefined;
  }

  // Phase operations
  async getAllPhases(): Promise<Phase[]> {
    return await db.select().from(phases).orderBy(phases.order);
  }

  async getPhase(id: number): Promise<Phase | undefined> {
    try {
      const [phase] = await db.select().from(phases).where(eq(phases.id, id));
      return phase || undefined;
    } catch (error) {
      console.error('Error fetching phase:', error);
      throw error;
    }
  }

  async createPhase(insertPhase: InsertPhase): Promise<Phase> {
    const [phase] = await db.insert(phases).values(insertPhase).returning();
    return phase;
  }

  // User progress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getUserProgressForPhase(userId: number, phaseId: number): Promise<UserProgress | undefined> {
    try {
      const [progress] = await db.select().from(userProgress)
        .where(and(eq(userProgress.userId, userId), eq(userProgress.phaseId, phaseId)));
      return progress || undefined;
    } catch (error) {
      console.error('Error fetching user progress for phase:', error);
      throw error;
    }
  }

  async updateUserProgress(userId: number, phaseId: number, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined> {
    const [progress] = await db.update(userProgress).set(updates)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.phaseId, phaseId)))
      .returning();
    return progress || undefined;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db.insert(userProgress).values(insertProgress).returning();
    return progress;
  }

  // Exercise operations
  async getExercisesForPhase(phaseId: number): Promise<Exercise[]> {
    try {
      return await db.select().from(exercises).where(eq(exercises.phaseId, phaseId));
    } catch (error) {
      console.error('Error fetching exercises for phase:', error);
      throw error;
    }
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id));
    return exercise || undefined;
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const [exercise] = await db.insert(exercises).values(insertExercise).returning();
    return exercise;
  }

  // User exercise progress operations
  async getUserExerciseProgressForPhase(userId: number, phaseId: number): Promise<UserExerciseProgress[]> {
    const rows = await db.select()
      .from(userExerciseProgress)
      .innerJoin(exercises, eq(userExerciseProgress.exerciseId, exercises.id))
      .where(and(eq(userExerciseProgress.userId, userId), eq(exercises.phaseId, phaseId)));

    return rows.map(row => row.user_exercise_progress);
  }

  async getUserExerciseProgress(userId: number, exerciseId: number): Promise<UserExerciseProgress | undefined> {
    const [progress] = await db.select().from(userExerciseProgress)
      .where(and(eq(userExerciseProgress.userId, userId), eq(userExerciseProgress.exerciseId, exerciseId)));
    return progress || undefined;
  }

  async updateUserExerciseProgress(userId: number, exerciseId: number, updates: Partial<InsertUserExerciseProgress>): Promise<UserExerciseProgress | undefined> {
    const [progress] = await db.update(userExerciseProgress).set(updates)
      .where(and(eq(userExerciseProgress.userId, userId), eq(userExerciseProgress.exerciseId, exerciseId)))
      .returning();
    return progress || undefined;
  }

  async createUserExerciseProgress(insertProgress: InsertUserExerciseProgress): Promise<UserExerciseProgress> {
    const [progress] = await db.insert(userExerciseProgress).values(insertProgress).returning();
    return progress;
  }

  // Journal operations
  async getUserJournalEntries(userId: number): Promise<JournalEntry[]> {
    return await db.select().from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(journalEntries.createdAt);
  }

  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    const [entry] = await db.select().from(journalEntries).where(eq(journalEntries.id, id));
    return entry || undefined;
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const [entry] = await db.insert(journalEntries).values(insertEntry).returning();
    return entry;
  }

  async updateJournalEntry(id: number, updates: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const [entry] = await db.update(journalEntries).set(updates).where(eq(journalEntries.id, id)).returning();
    return entry || undefined;
  }

  async deleteJournalEntry(id: number): Promise<boolean> {
    const result = await db.delete(journalEntries).where(eq(journalEntries.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Resource operations
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.category, category));
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }

  // Assessment operations
  async getAssessmentsForPhase(phaseId: number): Promise<Assessment[]>;
  async getAssessmentsForPhase(phaseId: number): Promise<Assessment[]> {
    try {
      return await db.select().from(assessments).where(eq(assessments.phaseId, phaseId));
    } catch (error) {
      console.error('Error fetching assessments for phase:', error);
      throw error;
    }
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment || undefined;
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db.insert(assessments).values(insertAssessment).returning();
    return assessment;
  }

  // User assessment results
  async getUserAssessmentResults(userId: number): Promise<UserAssessmentResult[]> {
    return await db.select().from(userAssessmentResults).where(eq(userAssessmentResults.userId, userId));
  }

  async getUserAssessmentResult(userId: number, assessmentId: number): Promise<UserAssessmentResult | undefined> {
    const [result] = await db.select().from(userAssessmentResults)
      .where(and(eq(userAssessmentResults.userId, userId), eq(userAssessmentResults.assessmentId, assessmentId)));
    return result || undefined;
  }

  async createUserAssessmentResult(insertResult: InsertUserAssessmentResult): Promise<UserAssessmentResult> {
    const [result] = await db.insert(userAssessmentResults).values(insertResult).returning();
    return result;
  }

  // Stripe and subscription operations
  async updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string | null): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserSubscription(userId: number, tier: string, status: string, endDate: Date | null): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({
        subscriptionTier: tier,
        subscriptionStatus: status,
        subscriptionEndDate: endDate
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.stripeCustomerId, stripeCustomerId));
    return user || undefined;
  }

  // Lead capture operations
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async getLeadsBySource(source: string): Promise<Lead[]> {
    return await db.select().from(leads).where(eq(leads.source, source));
  }
}

export const storage = new DatabaseStorage();