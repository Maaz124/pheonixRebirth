import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { 
  Leaf, Brain, Wand2, Shield, FileText, Play, Heart, Zap, Compass, 
  Download, ExternalLink, Search, BookOpen, Video, Headphones, Clock, Star
} from "lucide-react";

// Comprehensive therapeutic resources data
const therapeuticResources = {
  mindfulness: [
    {
      id: 1,
      title: "5-4-3-2-1 Grounding Technique",
      description: "A powerful sensory grounding exercise to manage anxiety and panic attacks",
      type: "Technique",
      duration: "2-5 minutes",
      difficulty: "Beginner",
      content: {
        overview: "The 5-4-3-2-1 technique helps you ground yourself in the present moment by engaging all five senses. This technique is particularly effective during anxiety attacks, dissociation, or overwhelming emotions.",
        steps: [
          "Name 5 things you can see around you (colors, objects, textures)",
          "Name 4 things you can touch (your chair, clothing, a surface)",
          "Name 3 things you can hear (traffic, birds, your breathing)",
          "Name 2 things you can smell (coffee, fresh air, perfume)",
          "Name 1 thing you can taste (gum, coffee, or just notice your mouth)"
        ],
        tips: [
          "Take your time with each step - there's no rush",
          "If you can't find something for a particular sense, that's okay",
          "Practice this technique when you're calm to build familiarity",
          "Use this during flashbacks to return to the present moment"
        ],
        whenToUse: "During anxiety attacks, panic attacks, dissociation, overwhelm, or anytime you need to feel more present and grounded."
      }
    },
    {
      id: 2,
      title: "Box Breathing (4-4-4-4)",
      description: "A simple yet powerful breathing technique used by Navy SEALs and trauma therapists",
      type: "Breathing Exercise",
      duration: "3-10 minutes",
      difficulty: "Beginner",
      content: {
        overview: "Box breathing, also known as square breathing, is a technique that helps regulate your nervous system by slowing down your breathing pattern. It activates the parasympathetic nervous system, promoting calm and focus.",
        steps: [
          "Sit comfortably with your back straight",
          "Exhale completely through your mouth",
          "Inhale through your nose for 4 counts",
          "Hold your breath for 4 counts",
          "Exhale through your mouth for 4 counts",
          "Hold empty for 4 counts",
          "Repeat for 4-10 cycles"
        ],
        tips: [
          "Start with shorter counts (3-3-3-3) if 4 feels too long",
          "Focus on the counting to quiet your mind",
          "Place one hand on your chest, one on your belly - breathe into your belly",
          "Practice daily for best results"
        ],
        whenToUse: "Before stressful situations, during anxiety, to improve focus, or as part of your daily mindfulness routine."
      }
    },
    {
      id: 3,
      title: "Body Scan Meditation",
      description: "A progressive relaxation technique to release tension and develop body awareness",
      type: "Meditation",
      duration: "10-30 minutes",
      difficulty: "Intermediate",
      content: {
        overview: "Body scan meditation helps you develop awareness of physical sensations and release stored tension. This practice is particularly healing for trauma survivors as it helps reconnect with the body in a gentle, non-threatening way.",
        steps: [
          "Lie down comfortably or sit with eyes closed",
          "Start at the top of your head, noticing any sensations",
          "Slowly move your attention down through your forehead, eyes, jaw",
          "Continue through your neck, shoulders, arms, and hands",
          "Move through your chest, breathing naturally",
          "Scan your abdomen, noticing without judgment",
          "Continue through your hips, thighs, knees, calves, and feet",
          "End by noticing your whole body as one connected system"
        ],
        tips: [
          "There's no 'right' way to feel - just notice what's there",
          "If you find areas of tension, breathe into them gently",
          "If you feel triggered, return to your breath or open your eyes",
          "Start with shorter sessions (5-10 minutes) and build up"
        ],
        whenToUse: "Before sleep, when feeling disconnected from your body, or to develop greater self-awareness and relaxation."
      }
    }
  ],
  cbt: [
    {
      id: 4,
      title: "Thought Record Worksheet",
      description: "Identify and challenge negative thought patterns with this CBT core technique",
      type: "Worksheet",
      duration: "10-20 minutes",
      difficulty: "Intermediate",
      content: {
        overview: "Thought records help you identify the connection between thoughts, feelings, and behaviors. This technique is fundamental to CBT and helps you develop awareness of automatic negative thoughts and learn to challenge them with evidence.",
        steps: [
          "Situation: Describe what happened that triggered difficult emotions",
          "Emotions: List the emotions you felt (sad, angry, anxious, etc.) and rate intensity 1-10",
          "Automatic Thoughts: Write down the thoughts that immediately came to mind",
          "Evidence For: List evidence that supports your automatic thoughts",
          "Evidence Against: List evidence that contradicts your automatic thoughts", 
          "Balanced Thought: Create a more balanced, realistic perspective",
          "New Emotion: Rate your emotional intensity after the balanced thought"
        ],
        tips: [
          "Be specific about situations rather than general",
          "Catch thoughts as close to the triggering event as possible",
          "Look for thinking patterns like all-or-nothing, catastrophizing, mind reading",  
          "The goal isn't positive thinking, but realistic thinking"
        ],
        whenToUse: "When you notice strong emotional reactions, recurring negative thoughts, or want to understand your thought patterns better."
      }
    },
    {
      id: 5,
      title: "Cognitive Distortions Guide",
      description: "Learn to identify the 10 most common thinking traps that fuel anxiety and depression",
      type: "Educational",
      duration: "15 minutes to learn",
      difficulty: "Beginner",
      content: {
        overview: "Cognitive distortions are inaccurate thought patterns that reinforce negative emotions. Learning to identify these patterns is the first step in changing them.",
        steps: [
          "All-or-Nothing Thinking: Seeing things in black and white categories",
          "Overgeneralization: Making broad conclusions from single events",
          "Mental Filter: Focusing only on negative details while ignoring positives",
          "Discounting the Positive: Dismissing positive experiences as 'not counting'",
          "Jumping to Conclusions: Mind reading or fortune telling without evidence",
          "Magnification/Minimization: Blowing things out of proportion or shrinking their importance",
          "Emotional Reasoning: Believing that negative emotions reflect reality",
          "Should Statements: Using should, must, or ought to motivate yourself",
          "Labeling: Giving yourself or others negative labels based on mistakes",
          "Personalization: Taking responsibility for things outside your control"
        ],
        tips: [
          "Start by noticing just one or two distortions you use most",
          "Keep a list handy and check it when you're upset",
          "Remember: identifying the distortion doesn't make the feeling invalid",
          "Practice self-compassion as you learn to change these patterns"
        ],
        whenToUse: "Daily self-reflection, during therapy sessions, or whenever you notice strong negative emotions."
      }
    },
    {
      id: 6,
      title: "Behavioral Activation Schedule",
      description: "Combat depression and trauma withdrawal by scheduling meaningful activities",
      type: "Planning Tool",
      duration: "20-30 minutes weekly",
      difficulty: "Intermediate", 
      content: {
        overview: "Behavioral activation helps combat depression and trauma-related withdrawal by gradually reintroducing meaningful activities into your life. The goal is to increase positive experiences and break the cycle of avoidance.",
        steps: [
          "Track your current activities and mood for one week",
          "Identify activities that previously brought you joy or meaning",
          "Rate activities by pleasure (how enjoyable) and mastery (sense of accomplishment)",
          "Schedule one small pleasant activity each day",
          "Include a mix of self-care, social, creative, and physical activities",
          "Start small and gradually increase difficulty/duration",
          "Track your mood before and after activities",
          "Adjust your schedule based on what works"
        ],
        tips: [
          "Start with activities that feel manageable, not overwhelming",
          "Include both solo activities and social connections",
          "Plan activities during your typical low-energy times",
          "Celebrate small wins - progress isn't always linear"
        ],
        whenToUse: "When feeling depressed, isolated, or stuck in avoidance patterns. Particularly helpful for trauma survivors who have withdrawn from previously enjoyed activities."
      }
    }
  ],
  nlp: [
    {
      id: 7,
      title: "Anchoring Technique",
      description: "Create instant access to resourceful emotional states when you need them most",
      type: "Technique",
      duration: "15-20 minutes to set up",
      difficulty: "Intermediate",
      content: {
        overview: "Anchoring allows you to associate a specific physical touch or gesture with a desired emotional state. Once established, you can trigger this positive state whenever needed, giving you more control over your emotional responses.",
        steps: [
          "Choose a positive emotional state you want to access (confidence, calm, joy)",
          "Recall a specific time when you felt this emotion strongly",
          "Fully immerse yourself in that memory - see what you saw, hear what you heard",
          "When the feeling is at its peak, create a unique physical anchor (press thumb to finger, touch your heart, etc.)",
          "Hold the anchor for 15-20 seconds while maintaining the peak feeling",
          "Release the anchor and break state (think of something neutral)",
          "Test the anchor by using the same physical gesture",
          "Repeat the process 3-5 times to strengthen the association"
        ],
        tips: [
          "Choose an anchor you can use discretely in public",
          "Use the anchor only when the positive feeling is at its peak",
          "Practice the anchor regularly to maintain its strength",
          "Create different anchors for different emotional states"
        ],
        whenToUse: "Before challenging situations, during anxiety or stress, when you need confidence, or to change your emotional state quickly."
      }
    },
    {
      id: 8,
      title: "Reframing Exercise",
      description: "Transform limiting beliefs and negative perspectives into empowering ones",
      type: "Cognitive Technique",
      duration: "10-15 minutes",
      difficulty: "Intermediate",
      content: {
        overview: "Reframing helps you look at situations from different perspectives, particularly changing disempowering viewpoints into more resourceful ones. This technique is especially powerful for addressing limiting beliefs formed during trauma.",
        steps: [
          "Identify the situation or belief that's causing distress",
          "Write down your current perspective/interpretation",
          "Ask: 'What else could this mean?'",
          "Consider: How might someone you admire view this situation?",
          "Look for potential benefits, lessons, or opportunities",
          "Find evidence that supports the new perspective",
          "Choose the most empowering and realistic reframe",
          "Practice thinking from this new perspective throughout the day"
        ],
        tips: [
          "The new perspective should feel believable, not just positive",
          "Consider multiple reframes before choosing one",
          "Focus on what you can control or learn from the situation",
          "Practice reframing small situations before tackling major ones"
        ],
        whenToUse: "When stuck in negative thinking patterns, facing challenges, or working to change limiting beliefs about yourself or your capabilities."
      }
    },
    {
      id: 9,
      title: "Future Self Visualization",
      description: "Connect with your healed future self for guidance and motivation",
      type: "Visualization",
      duration: "15-25 minutes",
      difficulty: "Advanced",
      content: {
        overview: "This powerful visualization technique helps you connect with your future healed self, gaining wisdom, motivation, and hope. It's particularly transformative for trauma survivors who struggle to envision a positive future.",
        steps: [
          "Find a quiet, comfortable space and close your eyes",
          "Take several deep breaths and allow your body to relax",
          "Imagine yourself 2-5 years in the future, fully healed and thriving",
          "See this future self clearly - how do they stand, dress, move?",
          "Notice their energy, confidence, and inner peace",
          "Ask your future self: 'What do I need to know right now?'",
          "Listen for their wisdom and guidance",
          "Ask: 'What's the next step I should take?'",
          "Feel the love and encouragement they have for you",
          "Thank your future self and slowly return to the present",
          "Write down any insights or guidance you received"
        ],
        tips: [
          "Trust whatever comes up, even if it seems simple",
          "Your future self embodies qualities you want to develop",
          "Return to this visualization whenever you need guidance or hope",
          "Notice how your future self has integrated their experiences"
        ],
        whenToUse: "When feeling hopeless about the future, needing guidance on decisions, or wanting motivation to continue your healing journey."
      }
    }
  ],
  trauma: [
    {
      id: 10,
      title: "Window of Tolerance",
      description: "Learn to recognize and expand your optimal zone of arousal for emotional regulation",
      type: "Educational Tool",
      duration: "10 minutes to learn",
      difficulty: "Beginner",
      content: {
        overview: "The Window of Tolerance concept helps you understand your nervous system's capacity to handle stress and emotions. When you're within your window, you can think clearly and respond flexibly. Outside your window, you're either hyperaroused (anxious, panicked) or hypoaroused (numb, disconnected).",
        steps: [
          "Learn to identify your optimal zone (Window of Tolerance)",
          "Recognize hyperarousal signs: anxiety, panic, racing thoughts, hypervigilance",
          "Recognize hypoarousal signs: numbness, disconnection, depression, fatigue",
          "Practice noticing when you're moving outside your window",
          "Use grounding techniques to return to your window when hyperaroused",
          "Use energizing techniques to return to your window when hypoaroused",
          "Gradually expand your window through safe practice",
          "Develop a toolkit of regulation strategies for each state"
        ],
        tips: [
          "Your window size can change based on stress, health, and circumstances",
          "Trauma often narrows the window - healing gradually expands it",
          "Prevention is easier than intervention - catch yourself early",
          "Practice regulation techniques when you're already in your window"
        ],
        whenToUse: "Daily self-monitoring, when feeling overwhelmed or numb, and as a framework for understanding your emotional responses."
      }
    },
    {
      id: 11,
      title: "TIPP Crisis Survival Skills",
      description: "Emergency techniques to quickly change your body chemistry during emotional crisis",
      type: "Crisis Tool",
      duration: "5-15 minutes",
      difficulty: "Beginner",
      content: {
        overview: "TIPP (Temperature, Intense Exercise, Paced Breathing, Progressive Relaxation) skills are designed to quickly change your body chemistry when you're in emotional crisis. These techniques work by activating your parasympathetic nervous system.",
        steps: [
          "Temperature: Use cold water on face/hands, hold ice cubes, or take a cold shower",
          "Intense Exercise: Do jumping jacks, run in place, or intense physical activity for 5-10 minutes",
          "Paced Breathing: Exhale longer than you inhale (breathe in for 4, out for 6)",
          "Progressive Muscle Relaxation: Tense and release muscle groups from head to toe"
        ],
        tips: [
          "Choose the technique that appeals to you in the moment",
          "Temperature changes work fastest for immediate relief",
          "Intense exercise helps when you feel restless or agitated",
          "Paced breathing is discrete and can be done anywhere",
          "Progressive relaxation works well before sleep"
        ],
        whenToUse: "During panic attacks, intense emotional distress, self-harm urges, or when you feel completely overwhelmed."
      }
    },
    {
      id: 12,
      title: "Trauma-Informed Yoga Sequence",
      description: "Gentle movement practices that honor your body's wisdom and promote safety",
      type: "Movement Practice",
      duration: "15-30 minutes",
      difficulty: "Beginner",
      content: {
        overview: "Trauma-informed yoga emphasizes choice, safety, and body awareness. This sequence helps you reconnect with your body gently, building strength and flexibility while respecting your boundaries.",
        steps: [
          "Begin in a comfortable seated position, noticing your breath",
          "Gentle neck rolls and shoulder shrugs to release tension",
          "Cat-cow stretches to mobilize the spine (on hands and knees or seated)",
          "Child's pose or seated forward fold (only if it feels safe)",
          "Gentle twists, moving slowly and mindfully",
          "Bridge pose or gentle backbend to open the heart center",
          "Legs up the wall or gentle inversion",
          "End in savasana or comfortable seated meditation"
        ],
        tips: [
          "Move at your own pace and modify as needed",
          "Keep your eyes open if closing them feels unsafe",
          "Exit any pose that doesn't feel right immediately",
          "Focus on what feels good rather than 'perfect' alignment",
          "Notice sensations without judgment"
        ],
        whenToUse: "When feeling disconnected from your body, to release stored tension, or as part of a regular self-care routine."
      }
    }
  ],
  worksheets: [
    {
      id: 13,
      title: "Boundary Assessment & Planning Worksheet",
      description: "Comprehensive tool to assess current boundaries and create a plan for healthier ones",
      type: "Assessment",
      duration: "30-45 minutes",
      difficulty: "Intermediate",
      content: {
        overview: "This worksheet helps you evaluate your current boundaries across different life areas and create specific plans for improvement. It's designed to help you move from boundary confusion to boundary clarity.",
        steps: [
          "Rate your current boundaries in each life area (1-10): relationships, work, family, time, energy, physical, emotional",
          "Identify your boundary violation patterns: what you tolerate that you shouldn't",
          "Recognize your boundary crossing patterns: where you violate others' boundaries",
          "List specific boundary challenges you face regularly",
          "Write your boundary values: what matters most to you",
          "Create specific boundary statements for common situations",
          "Plan how to communicate boundaries assertively",
          "Identify support systems for maintaining boundaries"
        ],
        tips: [
          "Be honest about areas where boundaries are weak",
          "Start with one boundary at a time rather than trying to change everything",
          "Practice boundary statements before you need them",
          "Remember that boundaries protect relationships, not harm them"
        ],
        whenToUse: "When starting boundary work, feeling overwhelmed by others' demands, or preparing for difficult conversations."
      }
    },
    {
      id: 14,
      title: "Self-Compassion Break Worksheet",
      description: "Structured practice for treating yourself with kindness during difficult moments",
      type: "Practice Guide",
      duration: "5-10 minutes per use",
      difficulty: "Beginner",
      content: {
        overview: "Based on Kristin Neff's research, this worksheet guides you through the three components of self-compassion: mindfulness, common humanity, and self-kindness. It's particularly healing for trauma survivors who struggle with self-criticism.",
        steps: [
          "Mindfulness: Acknowledge your suffering without over-identifying with it",
          "Say to yourself: 'This is a moment of suffering' or 'This hurts'",
          "Common Humanity: Remember that suffering is part of human experience",
          "Say: 'Suffering is part of life' or 'I'm not alone in this'",
          "Self-Kindness: Offer yourself the same compassion you'd give a good friend",
          "Say: 'May I be kind to myself' or 'May I give myself the compassion I need'"
        ],
        tips: [
          "Place your hands on your heart as you speak to yourself",
          "Adapt the phrases to language that feels authentic to you",
          "Practice when you're calm so it's available during difficult times",
          "Remember: self-compassion is not self-pity or self-indulgence"
        ],
        whenToUse: "During self-critical moments, after making mistakes, when facing challenges, or anytime you need emotional support."
      }
    },
    {
      id: 15,
      title: "Daily Mood & Energy Tracker",
      description: "Track patterns in your emotional and physical well-being to identify triggers and resources",
      type: "Tracking Sheet",
      duration: "2-5 minutes daily",
      difficulty: "Beginner",
      content: {
        overview: "Regular mood and energy tracking helps you identify patterns, triggers, and what supports your well-being. This awareness is crucial for making informed decisions about your daily activities and self-care.",
        steps: [
          "Rate your mood (1-10) at three times: morning, afternoon, evening",
          "Rate your energy level (1-10) at the same three times",
          "Note major activities, interactions, or events of the day",
          "Identify any triggers that affected your mood or energy",
          "Note what helped you feel better during difficult moments",
          "Track sleep quality and duration",
          "Note any symptoms (physical or emotional)",
          "Weekly review to identify patterns and insights"
        ],
        tips: [
          "Set reminders on your phone to check in with yourself",
          "Look for patterns over weeks, not days",
          "Notice both negative triggers and positive resources",
          "Use this information to make better daily choices"
        ],
        whenToUse: "Daily tracking, especially when starting therapy, changing medications, or working to understand your patterns better."
      }
    }
  ],
  videos: [
    {
      id: 16,
      title: "Guided Progressive Muscle Relaxation",
      description: "20-minute video guide to systematically release tension from your entire body",
      type: "Guided Practice",
      duration: "20 minutes",
      difficulty: "Beginner",
      content: {
        overview: "Progressive Muscle Relaxation (PMR) teaches you to recognize the difference between tension and relaxation by systematically tensing and then releasing different muscle groups. This practice is excellent for anxiety, sleep issues, and general stress relief.",
        steps: [
          "Find a comfortable position lying down or seated",
          "Start with deep breathing to center yourself",
          "Begin with your toes - tense for 5 seconds, then release",
          "Move up through calves, thighs, glutes, abdomen",
          "Continue through hands, forearms, upper arms, shoulders",
          "Progress through neck, face muscles, and scalp",
          "End with whole-body tension and release",
          "Rest in complete relaxation for several minutes"
        ],
        tips: [
          "Don't tense so hard that you cause pain",
          "Focus on the contrast between tension and relaxation",
          "If you have injuries, skip those muscle groups",
          "Practice regularly for best results"
        ],
        whenToUse: "Before sleep, during high stress periods, or when you notice physical tension from anxiety or trauma."
      }
    },
    {
      id: 17,
      title: "Loving-Kindness Meditation for Self-Healing",
      description: "Cultivate compassion for yourself and others through this ancient Buddhist practice",
      type: "Meditation",
      duration: "15 minutes",
      difficulty: "Intermediate",
      content: {
        overview: "Loving-kindness meditation helps heal the inner critic and develop genuine self-compassion. For trauma survivors, this practice can be initially challenging but ultimately deeply healing as it rewires patterns of self-judgment.",
        steps: [
          "Begin by settling into comfortable meditation posture",
          "Start with yourself: 'May I be happy, may I be healthy, may I be at peace'",
          "Visualize yourself receiving these wishes with genuine care",
          "Extend to a loved one: 'May you be happy, may you be healthy, may you be at peace'",
          "Include a neutral person (cashier, neighbor): same phrases",
          "Include someone difficult: same phrases (start small)",
          "Extend to all beings everywhere: same phrases",
          "Return to yourself with renewed compassion"
        ],
        tips: [
          "If self-directed kindness feels impossible, start with a pet or child",
          "Adapt the phrases to words that resonate with you",
          "It's normal for this to feel artificial at first",
          "Start with shorter sessions and build gradually"
        ],
        whenToUse: "When struggling with self-criticism, feeling disconnected from others, or as part of regular meditation practice."
      }
    },
    {
      id: 18,
      title: "EFT Tapping for Anxiety Relief",
      description: "Learn Emotional Freedom Technique to quickly reduce anxiety and emotional intensity",
      type: "Technique Training",
      duration: "12 minutes",
      difficulty: "Beginner",
      content: {
        overview: "EFT (Emotional Freedom Technique) combines ancient Chinese acupressure with modern psychology. By tapping on specific meridian points while focusing on your issue, you can quickly reduce emotional intensity and anxiety.",
        steps: [
          "Identify the specific anxiety or issue (rate intensity 1-10)",
          "Create a setup statement: 'Even though I have this [issue], I deeply and completely accept myself'",
          "Tap the karate chop point while repeating setup statement 3 times",
          "Tap each point 7 times while stating the problem: top of head, eyebrow, side of eye, under nose, chin, collarbone, under arm",
          "Take a deep breath and rate intensity again",
          "If still high, do another round focusing on 'remaining anxiety'",
          "Continue until intensity is 2 or below"
        ],
        tips: [
          "Tap firmly but gently - it shouldn't hurt",
          "Say the words out loud if possible",
          "Be specific about your issue rather than general",
          "It's okay if you don't believe it will work - try anyway"
        ],
        whenToUse: "During anxiety attacks, before stressful events, when feeling emotionally overwhelmed, or for ongoing anxiety management."
      }
    }
  ]
};

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("mindfulness");

  const filteredResources = therapeuticResources[selectedCategory as keyof typeof therapeuticResources]?.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];



  const ResourceDetailModal = ({ resource, onClose }: { resource: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <Badge variant="secondary">{resource.type}</Badge>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {resource.duration}
                </div>
                <Badge variant={resource.difficulty === 'Beginner' ? 'default' : resource.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                  {resource.difficulty}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-gray-700">{resource.content.overview}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Steps</h3>
              <ol className="space-y-2">
                {resource.content.steps.map((step: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Pro Tips</h3>
              <ul className="space-y-2">
                {resource.content.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <Star className="flex-shrink-0 w-4 h-4 text-yellow-500 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-800">When to Use This Technique</h3>
              <p className="text-orange-700">{resource.content.whenToUse}</p>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <BookOpen size={16} className="mr-2" />
                Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const [selectedResource, setSelectedResource] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Therapeutic Resource Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive collection of evidence-based techniques, worksheets, and tools for trauma recovery. 
            All resources are trauma-informed and designed to support your healing journey.
          </p>
          
          {/* Search */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search techniques, worksheets, exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-6 w-full mb-8 h-14">
              <TabsTrigger value="mindfulness" className="flex flex-col items-center p-2">
                <Leaf size={18} />
                <span className="text-xs mt-1">Mindfulness</span>
              </TabsTrigger>
              <TabsTrigger value="cbt" className="flex flex-col items-center p-2">
                <Brain size={18} />
                <span className="text-xs mt-1">CBT</span>
              </TabsTrigger>
              <TabsTrigger value="nlp" className="flex flex-col items-center p-2">
                <Wand2 size={18} />
                <span className="text-xs mt-1">NLP</span>
              </TabsTrigger>
              <TabsTrigger value="trauma" className="flex flex-col items-center p-2">
                <Shield size={18} />
                <span className="text-xs mt-1">Trauma</span>
              </TabsTrigger>
              <TabsTrigger value="worksheets" className="flex flex-col items-center p-2">
                <FileText size={18} />
                <span className="text-xs mt-1">Worksheets</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex flex-col items-center p-2">
                <Play size={18} />
                <span className="text-xs mt-1">Videos</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(therapeuticResources).map(([category, resources]) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-6">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="secondary">{resource.type}</Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock size={14} />
                                {resource.duration}
                              </div>
                              <Badge variant={resource.difficulty === 'Beginner' ? 'default' : resource.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                                {resource.difficulty}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                            <CardDescription className="text-base">{resource.description}</CardDescription>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedResource(resource)}
                            >
                              <BookOpen size={16} className="mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <Download size={16} className="mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Access Tools</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-teal-50">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Emergency Grounding</h3>
              <p className="text-sm text-gray-600">5-4-3-2-1 technique for panic attacks</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-teal-50">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Self-Compassion Break</h3>
              <p className="text-sm text-gray-600">3-step kindness practice</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Thought Record</h3>
              <p className="text-sm text-gray-600">Challenge negative thinking patterns</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-red-50">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Compass className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Boundary Planning</h3>
              <p className="text-sm text-gray-600">Set healthy limits with confidence</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetailModal 
          resource={selectedResource} 
          onClose={() => setSelectedResource(null)} 
        />
      )}
    </div>
  );
}
