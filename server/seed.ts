import { db } from "./db";
import { 
  users, phases, userProgress, exercises, resources, 
  assessments, journalEntries 
} from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create a sample user
  const [user] = await db.insert(users).values({
    username: "sarah.m",
    password: "password123",
    name: "Sarah Mitchell",
    initials: "SM"
  }).returning();

  console.log("✅ Created user:", user.username);

  // Initialize phases
  const phasesData = [
    {
      letter: "P",
      name: "Pause the Panic",
      description: "Learning to recognize and interrupt the fight-or-flight response, developing immediate coping strategies for overwhelming moments.",
      order: 1,
      isLocked: false,
    },
    {
      letter: "H",
      name: "Honor Your Humanity",
      description: "Embracing self-compassion and understanding that healing isn't linear. You're allowed to be human.",
      order: 2,
      isLocked: false,
    },
    {
      letter: "O",
      name: "Observe Your Patterns",
      description: "Developing awareness of triggers, responses, and the stories you tell yourself. Knowledge is power.",
      order: 3,
      isLocked: false,
    },
    {
      letter: "E",
      name: "Establish Boundaries",
      description: "Learning to say no without guilt and yes without resentment. Your energy is precious.",
      order: 4,
      isLocked: false,
    },
    {
      letter: "N",
      name: "Nurture Your Nervous System",
      description: "Understanding trauma's impact on your body and learning nervous system regulation techniques.",
      order: 5,
      isLocked: false,
    },
    {
      letter: "I",
      name: "Integrate Your Values",
      description: "Reconnecting with what truly matters to you and aligning your life with your authentic self.",
      order: 6,
      isLocked: false,
    },
    {
      letter: "X",
      name: "Expand Into Empowerment",
      description: "Stepping into your power, embracing your growth, and moving forward with confidence and purpose.",
      order: 7,
      isLocked: false,
    },
  ];

  const createdPhases = await db.insert(phases).values(phasesData).returning();
  console.log("✅ Created phases:", createdPhases.length);

  // Create user progress for each phase
  const progressData = createdPhases.map((phase, index) => ({
    userId: user.id,
    phaseId: phase.id,
    status: index === 0 ? "in_progress" as const : "locked" as const,
    exercisesCompleted: index === 0 ? 2 : 0,
    totalExercises: 5,
    completedAt: null
  }));

  await db.insert(userProgress).values(progressData);
  console.log("✅ Created user progress records");

  // Initialize exercises
  const exercisesData = [
    // Phase 1: Pause the Panic
    {
      phaseId: createdPhases[0].id,
      title: "5-4-3-2-1 Grounding Technique",
      description: "A powerful technique to ground yourself when feeling overwhelmed",
      type: "interactive",
      content: {
        instructions: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste",
        timeEstimate: "5 minutes"
      },
      order: 1,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Box Breathing Exercise",
      description: "Regulate your nervous system with rhythmic breathing",
      type: "interactive",
      content: {
        instructions: "Breathe in for 4, hold for 4, breathe out for 4, hold for 4. Repeat 4 times.",
        timeEstimate: "3 minutes"
      },
      order: 2,
    },
    // Phase 2: Honor Your Humanity
    {
      phaseId: createdPhases[1].id,
      title: "Self-Compassion Break",
      description: "Practice treating yourself with kindness",
      type: "reflection",
      content: {
        instructions: "Place your hand on your heart and speak to yourself as you would a dear friend",
        timeEstimate: "10 minutes"
      },
      order: 1,
    },
    // Phase 3: Observe Your Patterns
    {
      phaseId: createdPhases[2].id,
      title: "Trigger Awareness Journal",
      description: "Identify patterns in your emotional responses",
      type: "reflection",
      content: {
        instructions: "Notice what situations trigger strong emotional responses and write them down",
        timeEstimate: "15 minutes"
      },
      order: 1,
    },
    // Phase 4: Establish Boundaries
    {
      phaseId: createdPhases[3].id,
      title: "Boundary Practice Scenarios",
      description: "Practice saying no in different situations",
      type: "interactive",
      content: {
        instructions: "Role-play different boundary-setting scenarios",
        timeEstimate: "20 minutes"
      },
      order: 1,
    }
  ];

  await db.insert(exercises).values(exercisesData);
  console.log("✅ Created exercises");

  // Initialize resources
  const resourcesData = [
    {
      title: "Emergency Grounding Kit",
      description: "Quick techniques for overwhelming moments",
      category: "crisis-support",
      type: "guide",
      content: "5-4-3-2-1 grounding technique and other emergency tools",
      url: null,
    },
    {
      title: "Self-Compassion Break Audio",
      description: "Guided self-compassion meditation",
      category: "self-care",
      type: "audio",
      content: null,
      url: "/audio/self-compassion-break.mp3",
    },
    {
      title: "Boundary Setting Workbook",
      description: "Step-by-step boundary setting exercises",
      category: "boundaries",
      type: "workbook",
      content: "Comprehensive boundary setting guide with practical exercises",
      url: null,
    },
  ];

  await db.insert(resources).values(resourcesData);
  console.log("✅ Created resources");

  // Initialize assessments
  const assessmentsData = [
    {
      phaseId: createdPhases[0].id,
      title: "Nervous System Awareness Check-in",
      description: "Understand your current nervous system state",
      type: "self-assessment",
      questions: [
        {
          id: "nervous-state",
          question: "How does your nervous system feel right now?",
          type: "radio",
          options: ["Calm and regulated", "Slightly activated", "Moderately stressed", "Highly activated", "Shut down/numb"]
        },
        {
          id: "body-awareness",
          question: "Where do you feel tension in your body?",
          type: "text"
        }
      ],
      order: 1,
    },
  ];

  await db.insert(assessments).values(assessmentsData);
  console.log("✅ Created assessments");

  // Initialize sample journal entries
  const journalEntriesData = [
    {
      userId: user.id,
      title: "First Day of Healing",
      content: "Starting this journey feels overwhelming but also hopeful. I'm ready to reclaim my life.",
      mood: "hopeful",
      energyLevel: 6,
      phaseId: createdPhases[0].id,
    },
    {
      userId: user.id,
      title: "Recognizing My Triggers",
      content: "Today I noticed how my body tenses when I receive unexpected emails. This awareness is the first step.",
      mood: "peaceful",
      energyLevel: 7,
      phaseId: createdPhases[0].id,
    },
  ];

  await db.insert(journalEntries).values(journalEntriesData);
  console.log("✅ Created journal entries");

  console.log("🎉 Database seeding completed successfully!");
}

// Run the seed function
seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});