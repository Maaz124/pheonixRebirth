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
    totalExercises: index === 0 ? 8 : 5, // Phase 1 has 8 comprehensive exercises
    completedAt: null
  }));

  await db.insert(userProgress).values(progressData);
  console.log("✅ Created user progress records");

  // Initialize exercises
  const exercisesData = [
    // Phase 1: Pause the Panic - Comprehensive Interactive Content
    {
      phaseId: createdPhases[0].id,
      title: "Understanding Your Nervous System States",
      description: "Learn to recognize your body's alarm system and how trauma affects your nervous system",
      type: "educational",
      content: {
        neuroscience: "Your nervous system has three main states: ventral vagal (safe and social), sympathetic (fight/flight), and dorsal vagal (freeze/shutdown). Trauma keeps you stuck in survival states.",
        keyPoints: [
          "Your amygdala (alarm system) becomes hyperactive after trauma",
          "The prefrontal cortex (rational brain) goes offline during panic",
          "Chronic stress shrinks your 'window of tolerance' for managing emotions",
          "Your nervous system can be retrained through specific techniques"
        ],
        practicalApplication: "Notice throughout the day: Am I in my calm state, activated state, or shutdown state?",
        timeEstimate: "10 minutes"
      },
      order: 1,
    },
    {
      phaseId: createdPhases[0].id,
      title: "5-4-3-2-1 Grounding Technique",
      description: "Interrupt panic responses by engaging your senses and bringing yourself back to the present moment",
      type: "interactive",
      content: {
        neuroscience: "This technique activates your parasympathetic nervous system by engaging your sensory cortex, which sends calming signals to your amygdala and helps regulate your nervous system.",
        steps: [
          "Name 5 things you can SEE around you (Look for details, colors, textures)",
          "Name 4 things you can TOUCH (Feel different textures, temperatures)",
          "Name 3 things you can HEAR (Listen for distant sounds, close sounds)",
          "Name 2 things you can SMELL (Take gentle breaths through your nose)",
          "Name 1 thing you can TASTE (Or take a sip of water mindfully)"
        ],
        tips: [
          "Say each item out loud or in your mind",
          "Take your time with each sense",
          "If you can't find something for a sense, move to the next",
          "Practice this when calm so it's easier during panic"
        ],
        timeEstimate: "5-7 minutes"
      },
      order: 2,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Box Breathing for Nervous System Regulation",
      description: "Use rhythmic breathing to activate your vagus nerve and calm your nervous system",
      type: "interactive",
      content: {
        neuroscience: "Box breathing stimulates your vagus nerve, which activates your parasympathetic nervous system. This slows your heart rate, lowers blood pressure, and signals safety to your brain.",
        instructions: "Breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Repeat this cycle.",
        visualization: "Imagine drawing a box: inhale up one side, hold across the top, exhale down the other side, hold across the bottom",
        progressions: [
          "Beginner: 4-4-4-4 count",
          "Intermediate: 6-6-6-6 count", 
          "Advanced: 8-8-8-8 count"
        ],
        whenToUse: [
          "When you notice anxiety rising",
          "Before difficult conversations",
          "When your heart rate is elevated",
          "As a daily practice for nervous system health"
        ],
        timeEstimate: "5-10 minutes"
      },
      order: 3,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Progressive Muscle Relaxation",
      description: "Release physical tension and teach your body what relaxation feels like",
      type: "interactive",
      content: {
        neuroscience: "Trauma lives in the body. Progressive muscle relaxation helps release chronic tension patterns and teaches your nervous system the difference between tension and relaxation.",
        technique: "Tense each muscle group for 5 seconds, then release and notice the contrast",
        sequence: [
          "Feet and calves - curl toes, tense calves",
          "Thighs and glutes - squeeze tight",
          "Abdomen - pull belly button toward spine",
          "Hands and arms - make fists, tense arms",
          "Shoulders - lift toward ears",
          "Face - scrunch forehead, close eyes tight, clench jaw"
        ],
        benefits: [
          "Reduces cortisol (stress hormone) levels",
          "Improves body awareness",
          "Helps with sleep quality",
          "Builds mind-body connection"
        ],
        timeEstimate: "15-20 minutes"
      },
      order: 4,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Cold Water Reset Technique",
      description: "Use cold water to quickly reset your nervous system during intense emotional states",
      type: "interactive",
      content: {
        neuroscience: "Cold water activates the dive response, rapidly switching your nervous system from sympathetic (fight/flight) to parasympathetic (rest/digest). This technique can stop panic attacks within minutes.",
        methods: [
          "Cold water on wrists and face",
          "Hold ice cubes in your hands",
          "Splash cold water on face and neck",
          "Take a cold shower (if available)"
        ],
        science: "The trigeminal nerve in your face connects directly to your vagus nerve. Cold water stimulation sends immediate calming signals to your brain.",
        safetyNotes: [
          "Don't use if you have heart conditions",
          "Start with lukewarm water if very sensitive",
          "Use for 30 seconds to 2 minutes maximum"
        ],
        timeEstimate: "2-3 minutes"
      },
      order: 5,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Bilateral Stimulation for Emotional Regulation",
      description: "Use cross-lateral movements to integrate both brain hemispheres and reduce emotional intensity",
      type: "interactive",
      content: {
        neuroscience: "Bilateral stimulation activates both brain hemispheres simultaneously, mimicking REM sleep patterns. This helps process traumatic memories and reduces emotional charge.",
        techniques: [
          "Butterfly hug: Cross arms over chest, alternately tap shoulders",
          "March in place: Lift knees, touch with opposite hand",
          "Figure-8 breathing: Trace infinity symbol with finger while breathing",
          "Alternating heel-toe walking"
        ],
        applications: [
          "When feeling overwhelmed by memories",
          "After nightmares or flashbacks",
          "During therapy sessions",
          "As daily nervous system maintenance"
        ],
        duration: "Continue for 1-5 minutes until you feel calmer",
        timeEstimate: "5-10 minutes"
      },
      order: 6,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Window of Tolerance Assessment",
      description: "Learn to recognize when you're in your optimal zone versus hyperarousal or hypoarousal",
      type: "assessment",
      content: {
        neuroscience: "Your window of tolerance is the zone where you can handle stress without becoming overwhelmed (hyperarousal) or shutting down (hypoarousal). Trauma narrows this window.",
        hyperarousal: [
          "Racing thoughts",
          "Rapid heartbeat",
          "Anxiety or panic",
          "Hypervigilance",
          "Difficulty sleeping"
        ],
        windowOfTolerance: [
          "Can think clearly",
          "Emotionally balanced",
          "Physically relaxed",
          "Socially engaged",
          "Curious and learning"
        ],
        hypoarousal: [
          "Numbness or disconnection",
          "Extreme fatigue",
          "Depression",
          "Difficulty concentrating",
          "Feeling hopeless"
        ],
        practiceQuestions: [
          "Where am I right now on this spectrum?",
          "What helps me return to my window?",
          "What are my early warning signs?"
        ],
        timeEstimate: "15 minutes"
      },
      order: 7,
    },
    {
      phaseId: createdPhases[0].id,
      title: "Creating Your Personal Panic Protocol",
      description: "Design a personalized action plan for when panic strikes",
      type: "planning",
      content: {
        neuroscience: "Having a pre-planned response prevents your prefrontal cortex from going offline during panic. Your amygdala recognizes the familiar pattern and begins to calm more quickly.",
        protocolSteps: [
          "NOTICE: 'I'm having a panic response'",
          "NORMALIZE: 'This is my nervous system trying to protect me'",
          "NURTURE: Choose your go-to calming technique",
          "NAVIGATE: Remind yourself this will pass"
        ],
        techniques: [
          "Breathing technique of choice",
          "Grounding method that works best",
          "Physical movement or position",
          "Self-compassion phrase",
          "Safe person to contact if needed"
        ],
        practicePlan: [
          "Write your protocol down",
          "Practice techniques when calm",
          "Keep protocol easily accessible",
          "Review and adjust as needed"
        ],
        timeEstimate: "20-30 minutes"
      },
      order: 8,
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
      description: "Comprehensive assessment of your current nervous system state and trauma responses",
      type: "self-assessment",
      questions: [
        {
          id: "nervous-state",
          question: "How does your nervous system feel right now?",
          type: "radio",
          options: ["Calm and regulated", "Slightly activated", "Moderately stressed", "Highly activated", "Shut down/numb"],
          neuroscience: "This assesses your autonomic nervous system state. Each option represents different levels of activation in your sympathetic (fight/flight) or parasympathetic (rest/digest) systems."
        },
        {
          id: "body-awareness",
          question: "Where do you feel tension in your body right now?",
          type: "text",
          neuroscience: "Trauma is stored in the body as chronic tension patterns. Identifying these areas helps you understand where your nervous system holds stress."
        },
        {
          id: "hypervigilance",
          question: "How often do you scan your environment for potential threats?",
          type: "radio",
          options: ["Rarely", "Sometimes", "Often", "Almost constantly", "I don't notice myself doing this"],
          neuroscience: "Hypervigilance is when your amygdala (alarm center) stays constantly activated, scanning for danger even when you're safe."
        },
        {
          id: "sleep-quality",
          question: "How would you describe your sleep quality?",
          type: "radio",
          options: ["Deep and restful", "Light but adequate", "Restless and interrupted", "Difficulty falling asleep", "Frequent nightmares"],
          neuroscience: "Sleep disturbances indicate an overactive nervous system. Your brain can't enter restorative sleep when it's in survival mode."
        },
        {
          id: "emotional-regulation",
          question: "When you feel overwhelmed, what happens most often?",
          type: "radio",
          options: ["I can usually calm myself down", "I need time alone to regulate", "I feel like I'm going to explode", "I shut down and feel numb", "I panic and can't think clearly"],
          neuroscience: "This reveals your dominant stress response pattern: fight, flight, freeze, or fawn. Each response involves different brain regions and nervous system activation."
        },
        {
          id: "triggers",
          question: "What are your most common triggers? (Select all that apply)",
          type: "checkbox",
          options: ["Loud noises", "Crowded spaces", "Unexpected changes", "Criticism", "Feeling trapped", "Authority figures", "Conflict", "Being watched"],
          neuroscience: "Triggers are sensory or emotional cues that activate your amygdala's alarm response, often connected to past traumatic experiences."
        },
        {
          id: "window-tolerance",
          question: "How much stress can you handle before feeling overwhelmed?",
          type: "scale",
          min: 1,
          max: 10,
          labels: ["Very little", "Quite a lot"],
          neuroscience: "This measures your 'window of tolerance' - the zone where you can handle stress without becoming overwhelmed or shutting down. Trauma narrows this window."
        },
        {
          id: "recovery-time",
          question: "After a stressful event, how long does it typically take you to feel calm again?",
          type: "radio",
          options: ["A few minutes", "30 minutes to 1 hour", "Several hours", "A full day", "Several days"],
          neuroscience: "Recovery time indicates how efficiently your parasympathetic nervous system can restore balance after stress activation."
        }
      ],
      order: 1,
      feedback: {
        nervous_state: {
          "Calm and regulated": "You're in your ventral vagal state - this is your nervous system's optimal zone for healing and growth.",
          "Slightly activated": "You're experiencing mild sympathetic activation. This is manageable and normal.",
          "Moderately stressed": "Your fight/flight system is engaged. Grounding techniques will help return you to calm.",
          "Highly activated": "Your sympathetic nervous system is in high alert. Immediate regulation techniques are needed.",
          "Shut down/numb": "You may be in dorsal vagal shutdown. Gentle movement and breathing can help you reconnect."
        },
        hypervigilance: {
          "Rarely": "Your nervous system has maintained good regulation around threat detection.",
          "Sometimes": "Mild hypervigilance is common and manageable with awareness.",
          "Often": "Your amygdala is working overtime. Grounding techniques can help calm your alarm system.",
          "Almost constantly": "Chronic hypervigilance is exhausting. Professional support alongside these tools is recommended."
        },
        window_tolerance: {
          "1-3": "Your window of tolerance is quite narrow. Focus on gentle regulation techniques and building safety.",
          "4-6": "You have moderate capacity for stress. Work on expanding your window gradually.",
          "7-10": "You have good stress tolerance. Focus on maintaining and supporting your nervous system health."
        }
      }
    },
    {
      phaseId: createdPhases[0].id,
      title: "Trauma Response Pattern Assessment",
      description: "Identify your primary trauma responses and understand how they served to protect you",
      type: "self-assessment",
      questions: [
        {
          id: "fight-response",
          question: "When threatened or overwhelmed, how often do you become angry, argumentative, or aggressive?",
          type: "scale",
          min: 1,
          max: 10,
          labels: ["Never", "Very often"],
          neuroscience: "Fight response involves sympathetic nervous system activation with increased adrenaline and cortisol to prepare for confrontation."
        },
        {
          id: "flight-response",
          question: "When threatened or overwhelmed, how often do you feel the need to escape, run away, or avoid the situation?",
          type: "scale",
          min: 1,
          max: 10,
          labels: ["Never", "Very often"],
          neuroscience: "Flight response activates your sympathetic nervous system to prepare your body for escape, increasing heart rate and muscle tension."
        },
        {
          id: "freeze-response",
          question: "When threatened or overwhelmed, how often do you feel paralyzed, unable to move, or like a deer in headlights?",
          type: "scale",
          min: 1,
          max: 10,
          labels: ["Never", "Very often"],
          neuroscience: "Freeze response occurs when your nervous system becomes overwhelmed and temporarily shuts down motor function while maintaining high alert."
        },
        {
          id: "fawn-response",
          question: "When threatened or overwhelmed, how often do you become overly compliant, people-pleasing, or self-sacrificing?",
          type: "scale",
          min: 1,
          max: 10,
          labels: ["Never", "Very often"],
          neuroscience: "Fawn response involves suppressing your own needs to avoid conflict, often developing when other responses weren't safe or effective."
        },
        {
          id: "response-awareness",
          question: "How aware are you of your stress responses when they're happening?",
          type: "radio",
          options: ["Very aware - I notice immediately", "Somewhat aware - I notice after a few minutes", "Barely aware - I realize later", "Not aware - Others tell me", "I don't know"],
          neuroscience: "Awareness is the first step in nervous system regulation. The prefrontal cortex needs to observe the amygdala's activation to begin calming it."
        },
        {
          id: "childhood-responses",
          question: "Which responses do you remember using most as a child?",
          type: "checkbox",
          options: ["Fighting back", "Hiding or running away", "Freezing up", "Being extra good/compliant", "Dissociating or 'leaving' mentally"],
          neuroscience: "Early trauma responses become wired into your nervous system. Understanding these patterns helps you recognize why certain responses feel automatic."
        }
      ],
      order: 2,
      feedback: {
        dominant_response: "Your assessment suggests your primary trauma response is {response}. This response developed as a protective mechanism and served an important purpose in keeping you safe. Understanding this pattern is the first step in expanding your response options.",
        response_patterns: {
          fight: "Fight responses often develop when you needed to protect yourself or others. While this response can be powerful, learning to regulate it will help you choose when it's truly needed.",
          flight: "Flight responses develop when escape was your safest option. This response keeps you mobile and alert, but learning to feel safe in stillness is part of your healing journey.",
          freeze: "Freeze responses often develop when fight or flight weren't safe options. This response can feel scary, but it actually helped you survive. Learning to gently move through freeze states is key to your recovery.",
          fawn: "Fawn responses often develop when pleasing others was the safest strategy. While this created connection, learning to honor your own needs is crucial for your healing journey."
        }
      }
    },
    {
      phaseId: createdPhases[0].id,
      title: "Panic Response Readiness Assessment",
      description: "Evaluate your current tools and confidence for managing panic responses",
      type: "self-assessment",
      questions: [
        {
          id: "panic-frequency",
          question: "How often do you experience panic attacks or intense anxiety?",
          type: "radio",
          options: ["Never", "Rarely (few times per year)", "Sometimes (monthly)", "Often (weekly)", "Very often (daily)"],
          neuroscience: "Panic frequency indicates how often your amygdala triggers false alarms. With proper tools, you can retrain your nervous system to be less reactive."
        },
        {
          id: "panic-triggers",
          question: "Can you identify what typically triggers your panic responses?",
          type: "radio",
          options: ["Yes, I know my triggers well", "Somewhat, I recognize some patterns", "Not really, they seem random", "No, I have no idea", "I don't experience panic"],
          neuroscience: "Trigger awareness activates your prefrontal cortex (thinking brain) which can help regulate your amygdala (alarm brain) over time."
        },
        {
          id: "current-tools",
          question: "What tools do you currently use when feeling overwhelmed? (Select all that apply)",
          type: "checkbox",
          options: ["Deep breathing", "Grounding techniques", "Progressive muscle relaxation", "Medication", "Calling someone", "Removing myself from the situation", "Distraction", "I don't have tools"],
          neuroscience: "Having multiple regulation tools gives your nervous system options, preventing it from defaulting to old survival patterns."
        },
        {
          id: "tool-effectiveness",
          question: "How effective are your current coping strategies?",
          type: "radio",
          options: ["Very effective - they usually work", "Somewhat effective - they help sometimes", "Not very effective - they rarely work", "Not effective - nothing seems to help", "I don't have strategies"],
          neuroscience: "Effectiveness depends on matching the tool to your nervous system state. What works in mild stress may not work in high activation."
        },
        {
          id: "confidence-level",
          question: "How confident do you feel about managing your next panic response?",
          type: "scale",
          min: 1,
          max: 10,
          labels: ["Not confident at all", "Very confident"],
          neuroscience: "Confidence activates your prefrontal cortex and can actually prevent panic by reducing anticipatory anxiety."
        },
        {
          id: "recovery-support",
          question: "Who in your life understands your healing journey?",
          type: "radio",
          options: ["Many people - I have strong support", "A few people understand", "One or two people", "No one really understands", "I prefer to handle this alone"],
          neuroscience: "Social support activates your ventral vagal system (calm and connected state) and provides co-regulation for your nervous system."
        }
      ],
      order: 3,
      feedback: {
        readiness_level: {
          "high": "You have strong awareness and tools for managing panic responses. Focus on refining your techniques and building confidence.",
          "moderate": "You have some tools and awareness. Focus on expanding your toolkit and practicing techniques when you're calm.",
          "low": "You're in the early stages of building panic management skills. Start with basic grounding and breathing techniques.",
          "minimal": "Building panic management skills is a priority. Focus on creating a simple protocol and practicing one technique consistently."
        },
        recommendations: {
          "high_frequency": "Given your frequent panic responses, focus on prevention through daily nervous system maintenance and identifying early warning signs.",
          "low_awareness": "Building trigger awareness is crucial. Keep a simple log of when panic occurs and what might have contributed.",
          "few_tools": "Start with 1-2 simple techniques like box breathing and 5-4-3-2-1 grounding. Master these before adding more tools.",
          "low_confidence": "Confidence builds through practice. Start with techniques when you're calm so they're available during stress."
        }
      }
    }
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