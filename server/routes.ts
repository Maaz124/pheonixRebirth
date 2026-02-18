import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";
import {
  insertJournalEntrySchema,
  insertUserAssessmentResultSchema,
  insertUserProgressSchema,
  insertUserExerciseProgressSchema,
  insertLeadSchema
} from "@shared/schema";
import { EmailService } from "./email";
import { leadMagnetSequence } from "./email-sequences";
import { marked } from "marked";

// Configure storage for multer
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: uploadStorage });

// Helper to get Stripe instance with dynamic key
async function getStripe() {
  const secretKey = (await storage.getSetting("stripe_secret_key")) || process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe secret key not configured in settings");
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-06-30.basil" as any,
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadDir));

  // Middleware to check authentication for API routes
  app.use("/api", (req, res, next) => {
    // List of public paths that don't require authentication
    const publicPaths = [
      "/login",
      "/register",
      "/logout",
      "/stripe/webhook",
      "/leads",
      "/newsletter",
      "/phases",
      "/resources",
      "/blog",
      "/config"
    ];

    const isPublic = publicPaths.some(path => req.path.startsWith(path));
    console.log(`[API Middleware] ${req.method} ${req.path} - Public: ${isPublic}, Auth: ${req.isAuthenticated()}`);

    if (isPublic) {
      return next();
    }

    if (!req.isAuthenticated()) {
      // console.log(`[API Middleware] Blocking ${req.path}`);
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  });

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
  };

  // File Upload Endpoint
  app.post("/api/upload", upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ url: fileUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Public config endpoint
  app.get("/api/config", async (req, res) => {
    try {
      const priceSetting = await storage.getSetting("subscription_price");
      const publishableKey = await storage.getSetting("stripe_publishable_key");

      res.json({
        subscriptionPrice: priceSetting || "147",
        stripePublishableKey: publishableKey
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch config" });
    }
  });

  // Lead Capture
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);

      // Trigger email sequence
      if (lead.email) {
        try {
          // Get the first email in the sequence (Welcome email)
          const welcomeEmail = leadMagnetSequence.find(e => e.id === "lm-welcome");
          if (welcomeEmail) {
            const personalizedContent = welcomeEmail.content
              .replace("{{firstName}}", lead.firstName || "Friend")
              .replace("{{assessmentPhase}}", "Assessment") // Placeholder until we link assessment
              .replace("{{nextSteps}}", "healing")
              .replace("{{nervousSystemState}}", "regulated");

            const bodyHtml = await marked.parse(personalizedContent);

            const htmlContent = `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                 <div style="background: linear-gradient(135deg, #FF6B6B, #FF8E53); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0;">Phoenix Method™</h1>
                 </div>
                 <div style="padding: 24px; background: #fff; border: 1px solid #eee;">
                   ${bodyHtml}
                   
                   ${welcomeEmail.ctaText ? `
                     <div style="text-align: center; margin-top: 30px;">
                       <a href="https://phoenix-method.replit.app${welcomeEmail.ctaUrl}" style="background-color: #FF6B6B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                         ${welcomeEmail.ctaText}
                       </a>
                     </div>
                   ` : ''}
                 </div>
                 <div style="text-align: center; padding: 20px; font-size: 12px; color: #888;">
                   <p>© ${new Date().getFullYear()} Phoenix Method. All rights reserved.</p>
                 </div>
               </div>
             `;

            await EmailService.sendEmail(
              lead.email,
              welcomeEmail.subject,
              htmlContent
            );
          }
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          // Don't fail the request if email fails, just log it
        }
      }

      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to capture lead" });
      }
    }
  });

  // Admin Routes
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/settings/:key", requireAdmin, async (req, res) => {
    try {
      const value = await storage.getSetting(req.params.key);
      res.json({ value });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch setting" });
    }
  });

  app.post("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const { key, value } = req.body;
      const updated = await storage.updateSetting(key, value);
      res.json({ value: updated });
    } catch (error) {
      res.status(500).json({ message: "Failed to update setting" });
    }
  });

  // Get all phases (now protected)
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
      const progress = await storage.getUserProgress(req.user!.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Get user progress for specific phase
  app.get("/api/user/progress/:phaseId", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const progress = await storage.getUserProgressForPhase(req.user!.id, phaseId);
      if (!progress) {
        // Return default progress structure instead of 404 to avoid frontend errors
        return res.json({
          id: 0,
          userId: req.user!.id,
          phaseId: phaseId,
          status: "in_progress",
          exercisesCompleted: 0,
          totalExercises: 0,
          completedAt: null,
          updatedAt: new Date().toISOString()
        });
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

      const progress = await storage.updateUserProgress(req.user!.id, phaseId, updates);
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

  // Get all exercise progress for a phase
  app.get("/api/user/phases/:phaseId/exercises/progress", async (req, res) => {
    try {
      const phaseId = parseInt(req.params.phaseId);
      const progress = await storage.getUserExerciseProgressForPhase(req.user!.id, phaseId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exercise progress" });
    }
  });

  // Update user exercise progress
  app.patch("/api/user/exercises/:exerciseId/progress", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.exerciseId);
      const updates = insertUserExerciseProgressSchema.partial().parse(req.body);

      // 1. Update individual exercise progress
      let progress = await storage.updateUserExerciseProgress(req.user!.id, exerciseId, updates);
      if (!progress) {
        progress = await storage.createUserExerciseProgress({
          userId: req.user!.id,
          exerciseId,
          ...updates,
        });
      }

      // 2. Update aggregate phase progress
      const exercise = await storage.getExercise(exerciseId);
      if (exercise) {
        const phaseId = exercise.phaseId;

        // Get all exercises for phase to count total
        const phaseExercises = await storage.getExercisesForPhase(phaseId);
        const totalExercises = phaseExercises.length;

        // Get user's progress on these exercises
        const userExercisesProgress = await storage.getUserExerciseProgressForPhase(req.user!.id, phaseId);
        const completedCount = userExercisesProgress.filter(p => p.isCompleted).length;

        const isPhaseCompleted = completedCount === totalExercises && totalExercises > 0;

        // Upsert user_progress
        const existingPhaseProgress = await storage.getUserProgressForPhase(req.user!.id, phaseId);

        if (existingPhaseProgress) {
          await storage.updateUserProgress(req.user!.id, phaseId, {
            exercisesCompleted: completedCount,
            totalExercises: totalExercises,
            status: isPhaseCompleted ? 'completed' : 'in_progress',
            completedAt: isPhaseCompleted ? new Date() : null, // Only set if completed
          });
        } else {
          await storage.createUserProgress({
            userId: req.user!.id,
            phaseId,
            exercisesCompleted: completedCount,
            totalExercises: totalExercises,
            status: isPhaseCompleted ? 'completed' : 'in_progress',
            completedAt: isPhaseCompleted ? new Date() : null,
          });
        }
      }

      res.json(progress);
    } catch (error) {
      console.error('Error updating exercise progress:', error);
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
      const entries = await storage.getUserJournalEntries(req.user!.id);
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
        userId: req.user!.id,
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
        userId: req.user!.id,
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
      const results = await storage.getUserAssessmentResults(req.user!.id);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessment results" });
    }
  });

  // Create Stripe Payment Intent for one-time payment
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { tier } = req.body;
      const userId = req.user!.id;

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create or get Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const stripe = await getStripe();
        const customer = await stripe.customers.create({
          email: user.username,
          name: user.name,
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(userId, customerId, null);
      }

      // Fetch dynamic price from settings
      const priceSetting = await storage.getSetting("subscription_price");
      let amount = 14700; // Default fallback ($147.00)

      if (priceSetting) {
        amount = Math.round(parseFloat(priceSetting) * 100);
      }



      // Create PaymentIntent
      const stripe = await getStripe();
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: userId.toString(),
          tier,
        },
      });

      console.log('PaymentIntent created:', {
        id: paymentIntent.id,
        hasClientSecret: !!paymentIntent.client_secret,
        tier,
        amount
      });

      // Update user subscription state to pending (or similar tracking)
      // For now, we reuse the existing update but mark as 'pending_payment'
      await storage.updateUserSubscription(userId, tier, 'pending_payment', null);

      res.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error('Payment creation error:', error);
      res.status(400).json({ error: { message: error.message } });
    }
  });

  // Verify payment status and update subscription
  // This endpoint is called after payment redirect to ensure subscription is activated
  // even if webhook hasn't fired yet (useful for local development)
  app.post("/api/verify-payment", async (req, res) => {
    console.log('[API] verify-payment called', req.body);
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { payment_intent } = req.body;

      if (!payment_intent) {
        return res.status(400).json({ message: "Missing payment_intent" });
      }

      // Retrieve the payment intent from Stripe
      const stripe = await getStripe();
      const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

      if (paymentIntent.status === 'succeeded') {
        const userId = paymentIntent.metadata?.userId;
        const tier = paymentIntent.metadata?.tier || 'essential';

        if (userId && parseInt(userId) === req.user.id) {
          console.log(`Verifying payment for user ${userId}, activating ${tier} tier`);
          await storage.updateUserSubscription(
            req.user.id,
            tier,
            'lifetime',
            null,
            paymentIntent.amount_received,
            paymentIntent.currency,
            new Date()
          );

          return res.json({
            success: true,
            message: "Subscription activated",
            subscriptionStatus: 'lifetime'
          });
        } else {
          return res.status(400).json({ message: "Payment does not belong to current user" });
        }
      } else {
        return res.status(400).json({ message: "Payment not succeeded", status: paymentIntent.status });
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      res.status(500).json({ message: error.message });
    }
  });

  // Handle Stripe webhooks
  app.post("/api/stripe/webhook", async (req, res) => {
    let event;
    const signature = req.headers['stripe-signature'];

    try {
      if (!signature) {
        throw new Error('No Stripe signature found');
      }

      // Verify signature using the raw body buffer
      // Note: req.rawBody is populated by the express.json verify callback
      const stripe = await getStripe();
      event = stripe.webhooks.constructEvent(
        (req as any).rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;

          const userId = paymentIntent.metadata?.userId;
          const tier = paymentIntent.metadata?.tier || 'essential';

          if (userId) {
            await storage.updateUserSubscription(parseInt(userId), tier, 'active', null);
          } else if (paymentIntent.customer) {
            // Fallback: look up by customer ID if metadata is missing
            const user = await storage.getUserByStripeCustomerId(paymentIntent.customer as string);
            if (user) {
              await storage.updateUserSubscription(user.id, tier, 'active', null);
            }
          }
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object;
          console.log('[Webhook] Payment failed:', paymentIntent.id);
          // Could update status to 'failed' or 'inactive' if needed
          break;
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.created': {
          const subscription = event.data.object;
          // Find user by Stripe customer ID
          const user = await storage.getUserByStripeCustomerId(subscription.customer as string);

          if (user) {
            const status = subscription.status === 'active' ? 'active' : 'inactive';
            const endDate = (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000) : null;

            await storage.updateUserSubscription(user.id, user.subscriptionTier, status, endDate);
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const deletedSub = event.data.object;
          const user = await storage.getUserByStripeCustomerId(deletedSub.customer as string);
          if (user) {
            console.log(`[Webhook] Deactivating subscription for user ${user.id}`);
            await storage.updateUserSubscription(user.id, 'free', 'inactive', null);
          }
          break;
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(400).send('Webhook processing error');
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

  // Blog Routes
  app.get("/api/blog", async (req, res) => {
    try {
      // If admin, return all. If public, return only published
      if (req.isAuthenticated() && req.user?.isAdmin) {
        const posts = await storage.getAllBlogPosts();
        res.json(posts);
      } else {
        const posts = await storage.getPublishedBlogPosts();
        res.json(posts);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // If not published and not admin, hide it
      if (!post.isPublished && (!req.isAuthenticated() || !req.user?.isAdmin)) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", requireAdmin, async (req, res) => {
    try {
      const { title, content, excerpt, category, tags, coverImage, isPublished, slug } = req.body;
      // Basic validation
      if (!title || !content || !slug) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const post = await storage.createBlogPost({
        title,
        content,
        excerpt: excerpt || "",
        slug,
        category: category || "General",
        tags: tags || [],
        coverImage,
        author: req.user!.name,
        isPublished: !!isPublished,
      });
      res.status(201).json(post);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message || "Failed to create blog post" });
    }
  });

  app.patch("/api/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const post = await storage.updateBlogPost(id, updates);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
