import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { 
  insertJournalEntrySchema, 
  insertUserAssessmentResultSchema,
  insertUserProgressSchema,
  insertUserExerciseProgressSchema 
} from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

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

  // Create Stripe subscription
  app.post("/api/create-subscription", async (req, res) => {
    try {
      const { tier, billing } = req.body;
      const userId = 1; // For demo, using fixed user ID
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create or get Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: `${user.username}@example.com`,
          name: user.name,
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(userId, customerId, null);
      }

      // Define pricing (these would typically come from Stripe Price IDs)
      const priceData = {
        essential: {
          monthly: { unit_amount: 2900, interval: 'month' },
          annual: { unit_amount: 29000, interval: 'year' }
        },
        premium: {
          monthly: { unit_amount: 7900, interval: 'month' },
          annual: { unit_amount: 79000, interval: 'year' }
        }
      };

      const priceConfig = priceData[tier as keyof typeof priceData]?.[billing as 'monthly' | 'annual'];
      if (!priceConfig) {
        return res.status(400).json({ message: "Invalid tier or billing period" });
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: tier === 'essential' ? 'Phoenix Rise' : 'Phoenix Transform',
              description: tier === 'essential' 
                ? 'Complete access to the 7-phase recovery program'
                : 'Everything in Rise plus premium coaching support'
            },
            unit_amount: priceConfig.unit_amount,
            recurring: {
              interval: priceConfig.interval as 'month' | 'year'
            }
          }
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user subscription info
      await storage.updateUserStripeInfo(userId, customerId, subscription.id);
      await storage.updateUserSubscription(userId, tier, 'pending', null);

      const clientSecret = (subscription.latest_invoice as any)?.payment_intent?.client_secret;
      
      res.json({
        subscriptionId: subscription.id,
        clientSecret
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      res.status(400).json({ error: { message: error.message } });
    }
  });

  // Handle Stripe webhooks
  app.post("/api/stripe/webhook", async (req, res) => {
    try {
      const event = req.body;

      switch (event.type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.created':
          const subscription = event.data.object;
          const customer = await stripe.customers.retrieve(subscription.customer);
          
          // Find user by Stripe customer ID
          const user = await storage.getUserByStripeCustomerId(subscription.customer);
          if (user) {
            const status = subscription.status === 'active' ? 'active' : 'inactive';
            const endDate = subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null;
            
            await storage.updateUserSubscription(user.id, user.subscriptionTier, status, endDate);
          }
          break;

        case 'customer.subscription.deleted':
          const deletedSub = event.data.object;
          const deletedUser = await storage.getUserByStripeCustomerId(deletedSub.customer);
          if (deletedUser) {
            await storage.updateUserSubscription(deletedUser.id, 'free', 'inactive', null);
          }
          break;
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).send('Webhook error');
    }
  });

  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const { email, firstName, lastName, source, leadMagnet, assessmentResults } = req.body;
      
      const leadData = {
        email,
        firstName,
        lastName,
        source,
        leadMagnet,
        status: "active",
        emailSequence: "lead_magnet"
      };
      
      const lead = await storage.createLead(leadData);
      
      // In a real app, you would trigger email sequence here
      // await emailService.sendWelcomeEmail(lead);
      
      res.status(201).json({ 
        success: true, 
        message: "Lead captured successfully",
        leadId: lead.id 
      });
    } catch (error) {
      console.error('Lead capture error:', error);
      res.status(500).json({ message: "Failed to capture lead" });
    }
  });

  // Newsletter signup
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email, source = "newsletter" } = req.body;
      
      const leadData = {
        email,
        source,
        leadMagnet: "newsletter",
        status: "active",
        emailSequence: "nurture"
      };
      
      const lead = await storage.createLead(leadData);
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      });
    } catch (error) {
      console.error('Newsletter signup error:', error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
