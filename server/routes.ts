import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertJournalEntrySchema, 
  insertUserAssessmentResultSchema,
  insertUserProgressSchema,
  insertUserExerciseProgressSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Current user endpoint (for demo, always return user ID 1)
  app.get("/api/user/current", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get all phases
  app.get("/api/phases", async (req, res) => {
    try {
      const phases = await storage.getAllPhases();
      res.json(phases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch phases" });
    }
  });

  // Get specific phase
  app.get("/api/phases/:phaseId", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const phase = await storage.getPhase(phaseId);
      if (!phase) {
        return res.status(404).json({ message: "Phase not found" });
      }
      res.json(phase);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch phase" });
    }
  });

  // Get user progress for all phases
  app.get("/api/user/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(1);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Get user progress for specific phase
  app.get("/api/user/progress/:phaseId", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const progress = await storage.getUserProgressForPhase(1, phaseId);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch phase progress" });
    }
  });

  // Update user progress
  app.patch("/api/user/progress/:phaseId", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const updates = insertUserProgressSchema.partial().parse(req.body);
      
      const progress = await storage.updateUserProgress(1, phaseId, updates);
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Get exercises for a phase
  app.get("/api/phases/:phaseId/exercises", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const exercises = await storage.getExercisesForPhase(phaseId);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exercises" });
    }
  });

  // Get specific exercise
  app.get("/api/exercises/:exerciseId", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.exerciseId);
      const exercise = await storage.getExercise(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exercise" });
    }
  });

  // Update user exercise progress
  app.patch("/api/user/exercises/:exerciseId/progress", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.exerciseId);
      const updates = insertUserExerciseProgressSchema.partial().parse(req.body);
      
      const progress = await storage.updateUserExerciseProgress(1, exerciseId, updates);
      if (!progress) {
        // Create new progress entry if it doesn't exist
        const newProgress = await storage.createUserExerciseProgress({
          userId: 1,
          exerciseId,
          ...updates,
        });
        return res.json(newProgress);
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to update exercise progress" });
    }
  });

  // Get all resources
  app.get("/api/resources", async (req, res) => {
    try {
      const category = req.query.category as string;
      
      const resources = category 
        ? await storage.getResourcesByCategory(category)
        : await storage.getAllResources();
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  // Get user journal entries
  app.get("/api/user/journal", async (req, res) => {
    try {
      const entries = await storage.getUserJournalEntries(1);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch journal entries" });
    }
  });

  // Create journal entry
  app.post("/api/user/journal", async (req, res) => {
    try {
      const entryData = insertJournalEntrySchema.parse({
        ...req.body,
        userId: 1,
      });
      
      const entry = await storage.createJournalEntry(entryData);
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ message: "Failed to create journal entry" });
    }
  });

  // Update journal entry
  app.patch("/api/user/journal/:entryId", async (req, res) => {
    try {
      const entryId = parseInt(req.params.entryId);
      const updates = insertJournalEntrySchema.partial().parse(req.body);
      
      const entry = await storage.updateJournalEntry(entryId, updates);
      if (!entry) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: "Failed to update journal entry" });
    }
  });

  // Delete journal entry
  app.delete("/api/user/journal/:entryId", async (req, res) => {
    try {
      const entryId = parseInt(req.params.entryId);
      const deleted = await storage.deleteJournalEntry(entryId);
      if (!deleted) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete journal entry" });
    }
  });

  // Get assessments for phase
  app.get("/api/phases/:phaseId/assessments", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const assessments = await storage.getAssessmentsForPhase(phaseId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Submit assessment result
  app.post("/api/user/assessments/:assessmentId/results", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      const resultData = insertUserAssessmentResultSchema.parse({
        ...req.body,
        userId: 1,
        assessmentId,
      });
      
      const result = await storage.createUserAssessmentResult(resultData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit assessment result" });
    }
  });

  // Get user assessment results
  app.get("/api/user/assessments", async (req, res) => {
    try {
      const results = await storage.getUserAssessmentResults(1);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessment results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
