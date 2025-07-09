import { 
  users, phases, userProgress, exercises, userExerciseProgress, 
  journalEntries, resources, assessments, userAssessmentResults,
  type User, type InsertUser, type Phase, type InsertPhase,
  type UserProgress, type InsertUserProgress, type Exercise, type InsertExercise,
  type UserExerciseProgress, type InsertUserExerciseProgress,
  type JournalEntry, type InsertJournalEntry, type Resource, type InsertResource,
  type Assessment, type InsertAssessment, type UserAssessmentResult, type InsertUserAssessmentResult
} from "@shared/schema";

export interface IStorage {
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private phases: Map<number, Phase> = new Map();
  private userProgress: Map<string, UserProgress> = new Map(); // key: `${userId}-${phaseId}`
  private exercises: Map<number, Exercise> = new Map();
  private userExerciseProgress: Map<string, UserExerciseProgress> = new Map(); // key: `${userId}-${exerciseId}`
  private journalEntries: Map<number, JournalEntry> = new Map();
  private resources: Map<number, Resource> = new Map();
  private assessments: Map<number, Assessment> = new Map();
  private userAssessmentResults: Map<string, UserAssessmentResult> = new Map(); // key: `${userId}-${assessmentId}`
  
  private currentId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Create demo user
    const user: User = {
      id: 1,
      username: "sarah.m",
      password: "password",
      name: "Sarah M.",
      initials: "SM",
      currentPhase: 4,
      createdAt: new Date(),
    };
    this.users.set(1, user);

    // Initialize PHOENIX phases
    const phaseData = [
      { letter: "P", name: "Pause the Panic", description: "Regulate the nervous system, create emotional safety", order: 1, isLocked: false },
      { letter: "H", name: "Heal the Hurt", description: "Identify emotional wounds and trauma patterns", order: 2, isLocked: false },
      { letter: "O", name: "Own Your Narrative", description: "Reframe your story with self-worth and power", order: 3, isLocked: false },
      { letter: "E", name: "Empower Your Boundaries", description: "Learn how to say no, without shame", order: 4, isLocked: false },
      { letter: "N", name: "Nurture the Brain", description: "Neuroscience of trauma, dopamine, hormones, sleep", order: 5, isLocked: true },
      { letter: "I", name: "Integrate the Inner Self", description: "Align body, belief, and spiritual truth", order: 6, isLocked: true },
      { letter: "X", name: "eXpress Your New Identity", description: "Step into leadership, peace, and purpose", order: 7, isLocked: true },
    ];

    phaseData.forEach((phase, index) => {
      const phaseObj: Phase = { id: index + 1, ...phase };
      this.phases.set(index + 1, phaseObj);
    });

    // Initialize user progress
    for (let i = 1; i <= 7; i++) {
      const status = i <= 3 ? 'completed' : i === 4 ? 'in_progress' : 'locked';
      const exercisesCompleted = i <= 3 ? [8, 6, 5][i - 1] : i === 4 ? 2 : 0;
      const totalExercises = [8, 6, 5, 7, 7, 6, 8][i - 1];
      
      const progress: UserProgress = {
        id: i,
        userId: 1,
        phaseId: i,
        status,
        exercisesCompleted,
        totalExercises,
        completedAt: status === 'completed' ? new Date() : null,
        updatedAt: new Date(),
      };
      this.userProgress.set(`1-${i}`, progress);
    }

    // Initialize resources
    const resourceData = [
      { category: "mindfulness", title: "Body Scan Meditation", description: "Guided body awareness practice", type: "exercise" },
      { category: "mindfulness", title: "Breathing Techniques", description: "Various breathing exercises for regulation", type: "exercise" },
      { category: "mindfulness", title: "Loving-Kindness Practice", description: "Cultivating self-compassion", type: "exercise" },
      { category: "cbt", title: "Thought Record Sheets", description: "Track and challenge negative thoughts", type: "worksheet" },
      { category: "cbt", title: "Cognitive Distortions Guide", description: "Identify common thinking patterns", type: "reading" },
      { category: "cbt", title: "Behavioral Activation", description: "Plan meaningful activities", type: "exercise" },
      { category: "nlp", title: "Anchoring Techniques", description: "Create positive emotional anchors", type: "exercise" },
      { category: "nlp", title: "Reframing Exercises", description: "Change perspective on experiences", type: "exercise" },
      { category: "nlp", title: "Timeline Therapy", description: "Heal past experiences", type: "exercise" },
      { category: "trauma", title: "Grounding Techniques", description: "Return to present moment awareness", type: "exercise" },
      { category: "trauma", title: "Safety Planning", description: "Create emotional safety strategies", type: "worksheet" },
      { category: "trauma", title: "Somatic Exercises", description: "Body-based trauma release", type: "exercise" },
      { category: "worksheets", title: "Boundary Setting Worksheet", description: "Define and practice boundaries", type: "worksheet" },
      { category: "worksheets", title: "Emotion Tracking Journal", description: "Monitor emotional patterns", type: "worksheet" },
      { category: "worksheets", title: "Values Clarification", description: "Identify core values", type: "worksheet" },
      { category: "videos", title: "Boundary Setting Practice", description: "Guided boundary visualization", type: "video" },
      { category: "videos", title: "Trauma & the Brain", description: "Understanding trauma's impact", type: "video" },
      { category: "videos", title: "Self-Compassion Training", description: "Develop self-kindness", type: "video" },
    ];

    resourceData.forEach((resource, index) => {
      const resourceObj: Resource = { 
        id: index + 1, 
        ...resource,
        content: null,
        url: null,
        phaseId: null,
      };
      this.resources.set(index + 1, resourceObj);
    });

    // Initialize sample journal entries
    const journalData = [
      {
        userId: 1,
        title: "Boundary Practice",
        content: "I practiced saying no to a social event today. It felt scary at first, but also empowering. I'm learning that my needs matter too...",
        mood: "hopeful",
        energyLevel: 7,
        phaseId: 4,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
      },
      {
        userId: 1,
        title: "Self-Compassion",
        content: "Working on being kinder to myself. The inner critic was loud today, but I used the grounding technique and it helped...",
        mood: "peaceful",
        energyLevel: 5,
        phaseId: 3,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    ];

    journalData.forEach((entry, index) => {
      const journalEntry: JournalEntry = {
        id: index + 1,
        ...entry,
        isPrivate: true,
        updatedAt: entry.createdAt,
      };
      this.journalEntries.set(index + 1, journalEntry);
    });

    // Initialize exercises for each phase
    this.initializeExercises();
    
    // Initialize assessments for each phase
    this.initializeAssessments();
    
    this.currentId = 1000; // Start from 1000 for new entries
  }

  private initializeExercises() {
    const exerciseData = [
      // Phase 1: Pause the Panic
      {
        phaseId: 1,
        title: "Understanding Your Nervous System",
        description: "Learn how trauma affects your body's alarm system",
        content: {
          type: "reading",
          text: "Your nervous system is like a smoke detector that's become overly sensitive. Understanding this helps normalize your reactions.",
          keyPoints: [
            "The autonomic nervous system controls fight/flight responses",
            "Trauma can make this system hypervigilant",
            "Recognition is the first step to regulation"
          ]
        },
        type: "reading",
        order: 1
      },
      {
        phaseId: 1,
        title: "5-4-3-2-1 Grounding Technique",
        description: "Quick grounding exercise for overwhelming moments",
        content: {
          type: "practice",
          instructions: [
            "Name 5 things you can see",
            "Name 4 things you can touch",
            "Name 3 things you can hear",
            "Name 2 things you can smell",
            "Name 1 thing you can taste"
          ],
          duration: "2-3 minutes"
        },
        type: "practice",
        order: 2
      },
      {
        phaseId: 1,
        title: "Box Breathing Exercise",
        description: "Regulate your nervous system through controlled breathing",
        content: {
          type: "practice",
          instructions: [
            "Breathe in for 4 counts",
            "Hold for 4 counts",
            "Breathe out for 4 counts",
            "Hold for 4 counts",
            "Repeat 4-8 times"
          ],
          duration: "3-5 minutes"
        },
        type: "practice",
        order: 3
      },
      
      // Phase 2: Heal the Hurt
      {
        phaseId: 2,
        title: "Identifying Trauma Responses",
        description: "Recognize your unique trauma patterns",
        content: {
          type: "assessment",
          questions: [
            "When stressed, do you tend to fight, flee, freeze, or fawn?",
            "What situations trigger your strongest reactions?",
            "How does trauma show up in your body?"
          ]
        },
        type: "assessment",
        order: 1
      },
      {
        phaseId: 2,
        title: "Inner Child Meditation",
        description: "Connect with your younger self with compassion",
        content: {
          type: "practice",
          script: "Imagine your younger self who first experienced hurt. What would you say to comfort her?",
          duration: "10-15 minutes"
        },
        type: "practice",
        order: 2
      },
      
      // Phase 3: Own Your Narrative
      {
        phaseId: 3,
        title: "Rewriting Your Story",
        description: "Transform victim stories into survivor strength",
        content: {
          type: "exercise",
          prompts: [
            "What challenges have made you stronger?",
            "What would you tell someone facing similar struggles?",
            "How has your experience given you unique wisdom?"
          ]
        },
        type: "reflection",
        order: 1
      },
      
      // Phase 4: Empower Your Boundaries  
      {
        phaseId: 4,
        title: "Boundary Assessment",
        description: "Evaluate your current boundary patterns",
        content: {
          type: "assessment",
          categories: ["Physical", "Emotional", "Mental", "Spiritual", "Time", "Material"]
        },
        type: "assessment",
        order: 1
      },
      {
        phaseId: 4,
        title: "Boundary Scripts Practice",
        description: "Practice saying no with confidence",
        content: {
          type: "practice",
          scenarios: [
            "A friend asks for money you can't afford to lend",
            "Your boss asks you to work late again",
            "Someone makes an inappropriate comment"
          ],
          scripts: [
            "I'm not able to do that right now",
            "That doesn't work for me",
            "I need to think about it"
          ]
        },
        type: "practice",
        order: 2
      }
    ];

    exerciseData.forEach((exercise, index) => {
      const exerciseObj: Exercise = { 
        id: index + 200, 
        ...exercise,
        content: exercise.content as any
      };
      this.exercises.set(index + 200, exerciseObj);
    });
  }

  private initializeAssessments() {
    const assessmentData = [
      {
        phaseId: 1,
        title: "Nervous System Awareness Check",
        description: "Understand your current stress response patterns",
        questions: [
          {
            id: "stress1",
            question: "When faced with conflict, my typical response is:",
            type: "radio",
            options: [
              "I get angry and fight back",
              "I try to escape or avoid the situation", 
              "I freeze up and can't respond",
              "I try to please everyone to avoid conflict"
            ]
          },
          {
            id: "stress2", 
            question: "How often do you feel on edge or hypervigilant?",
            type: "radio",
            options: [
              "Almost constantly",
              "Several times a week",
              "Occasionally",
              "Rarely"
            ]
          }
        ],
        scoringRubric: {
          fightResponse: ["I get angry and fight back"],
          flightResponse: ["I try to escape or avoid the situation"],
          freezeResponse: ["I freeze up and can't respond"],
          fawnResponse: ["I try to please everyone to avoid conflict"]
        }
      },
      {
        phaseId: 4,
        title: "Boundary Readiness Assessment",
        description: "Evaluate your comfort with setting and maintaining boundaries",
        questions: [
          {
            id: "boundary1",
            question: "When someone asks you to do something you don't want to do:",
            type: "radio",
            options: [
              "I usually say yes even when I don't want to",
              "I feel guilty but sometimes say no", 
              "I can say no without feeling guilty",
              "I struggle to even recognize I don't want to do it"
            ]
          },
          {
            id: "boundary2",
            question: "How do you feel when someone is upset with you?",
            type: "radio", 
            options: [
              "I feel responsible and need to fix it immediately",
              "I feel uncomfortable but can manage it",
              "I understand it's their emotion to process",
              "I get angry at them for being upset"
            ]
          },
          {
            id: "boundary3",
            question: "Rate your comfort level with saying 'no' (1-10):",
            type: "scale",
            min: 1,
            max: 10
          }
        ],
        scoringRubric: {
          lowBoundaries: [0, 3],
          developingBoundaries: [4, 6], 
          healthyBoundaries: [7, 10]
        }
      }
    ];

    assessmentData.forEach((assessment, index) => {
      const assessmentObj: Assessment = {
        id: index + 300,
        ...assessment,
        questions: assessment.questions as any,
        scoringRubric: assessment.scoringRubric as any
      };
      this.assessments.set(index + 300, assessmentObj);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      currentPhase: insertUser.currentPhase || 1,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Phase operations
  async getAllPhases(): Promise<Phase[]> {
    return Array.from(this.phases.values()).sort((a, b) => a.order - b.order);
  }

  async getPhase(id: number): Promise<Phase | undefined> {
    return this.phases.get(id);
  }

  async createPhase(insertPhase: InsertPhase): Promise<Phase> {
    const id = this.currentId++;
    const phase: Phase = { 
      ...insertPhase, 
      id,
      isLocked: insertPhase.isLocked !== undefined ? insertPhase.isLocked : true,
    };
    this.phases.set(id, phase);
    return phase;
  }

  // User progress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getUserProgressForPhase(userId: number, phaseId: number): Promise<UserProgress | undefined> {
    return this.userProgress.get(`${userId}-${phaseId}`);
  }

  async updateUserProgress(userId: number, phaseId: number, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined> {
    const key = `${userId}-${phaseId}`;
    const progress = this.userProgress.get(key);
    if (!progress) return undefined;

    const updatedProgress = { 
      ...progress, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.userProgress.set(key, updatedProgress);
    return updatedProgress;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentId++;
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      updatedAt: new Date(),
      completedAt: insertProgress.completedAt || null,
      exercisesCompleted: insertProgress.exercisesCompleted || 0,
      totalExercises: insertProgress.totalExercises || 0,
    };
    this.userProgress.set(`${insertProgress.userId}-${insertProgress.phaseId}`, progress);
    return progress;
  }

  // Exercise operations
  async getExercisesForPhase(phaseId: number): Promise<Exercise[]> {
    return Array.from(this.exercises.values())
      .filter(exercise => exercise.phaseId === phaseId)
      .sort((a, b) => a.order - b.order);
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.currentId++;
    const exercise: Exercise = { ...insertExercise, id };
    this.exercises.set(id, exercise);
    return exercise;
  }

  // User exercise progress operations
  async getUserExerciseProgress(userId: number, exerciseId: number): Promise<UserExerciseProgress | undefined> {
    return this.userExerciseProgress.get(`${userId}-${exerciseId}`);
  }

  async updateUserExerciseProgress(userId: number, exerciseId: number, updates: Partial<InsertUserExerciseProgress>): Promise<UserExerciseProgress | undefined> {
    const key = `${userId}-${exerciseId}`;
    const progress = this.userExerciseProgress.get(key);
    if (!progress) return undefined;

    const updatedProgress = { ...progress, ...updates };
    if (updates.isCompleted) {
      updatedProgress.completedAt = new Date();
    }
    this.userExerciseProgress.set(key, updatedProgress);
    return updatedProgress;
  }

  async createUserExerciseProgress(insertProgress: InsertUserExerciseProgress): Promise<UserExerciseProgress> {
    const id = this.currentId++;
    const progress: UserExerciseProgress = { 
      ...insertProgress, 
      id,
      completedAt: insertProgress.isCompleted ? new Date() : null,
      isCompleted: insertProgress.isCompleted || false,
      responses: insertProgress.responses || null,
    };
    this.userExerciseProgress.set(`${insertProgress.userId}-${insertProgress.exerciseId}`, progress);
    return progress;
  }

  // Journal operations
  async getUserJournalEntries(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.currentId++;
    const entry: JournalEntry = { 
      ...insertEntry, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: insertEntry.title || null,
      mood: insertEntry.mood || null,
      energyLevel: insertEntry.energyLevel || null,
      phaseId: insertEntry.phaseId || null,
      isPrivate: insertEntry.isPrivate !== undefined ? insertEntry.isPrivate : true,
    };
    this.journalEntries.set(id, entry);
    return entry;
  }

  async updateJournalEntry(id: number, updates: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const entry = this.journalEntries.get(id);
    if (!entry) return undefined;

    const updatedEntry = { 
      ...entry, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.journalEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteJournalEntry(id: number): Promise<boolean> {
    return this.journalEntries.delete(id);
  }

  // Resource operations
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.category === category);
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentId++;
    const resource: Resource = { 
      ...insertResource, 
      id,
      content: insertResource.content || null,
      url: insertResource.url || null,
      phaseId: insertResource.phaseId || null,
    };
    this.resources.set(id, resource);
    return resource;
  }

  // Assessment operations
  async getAssessmentsForPhase(phaseId: number): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(assessment => assessment.phaseId === phaseId);
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentId++;
    const assessment: Assessment = { 
      ...insertAssessment, 
      id,
      scoringRubric: insertAssessment.scoringRubric || null,
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  // User assessment results
  async getUserAssessmentResults(userId: number): Promise<UserAssessmentResult[]> {
    return Array.from(this.userAssessmentResults.values()).filter(result => result.userId === userId);
  }

  async getUserAssessmentResult(userId: number, assessmentId: number): Promise<UserAssessmentResult | undefined> {
    return this.userAssessmentResults.get(`${userId}-${assessmentId}`);
  }

  async createUserAssessmentResult(insertResult: InsertUserAssessmentResult): Promise<UserAssessmentResult> {
    const id = this.currentId++;
    const result: UserAssessmentResult = { 
      ...insertResult, 
      id,
      completedAt: new Date(),
      score: insertResult.score || null,
      interpretation: insertResult.interpretation || null,
    };
    this.userAssessmentResults.set(`${insertResult.userId}-${insertResult.assessmentId}`, result);
    return result;
  }
}

export const storage = new MemStorage();
