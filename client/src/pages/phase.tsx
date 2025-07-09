import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseCard } from "@/components/exercise-card";
import { InteractiveAssessment } from "@/components/interactive-assessment";
import { ArrowLeft, Lightbulb, BookOpen, Target, Heart, Save } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Phase, UserProgress, Exercise, Assessment, JournalEntry, InsertJournalEntry } from "@shared/schema";

export default function PhasePage() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const phaseIdNum = parseInt(phaseId || "0");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Reflection state
  const [reflections, setReflections] = useState({
    wins: "",
    challenges: "",
    intention: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Navigation state
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);

  const { data: phase, isLoading: phaseLoading, error: phaseError } = useQuery<Phase>({
    queryKey: ['/api/phases', phaseIdNum],
    enabled: !!phaseIdNum,
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ['/api/user/progress', phaseIdNum],
    enabled: !!phaseIdNum,
  });

  const { data: exercises = [], isLoading: exercisesLoading } = useQuery<Exercise[]>({
    queryKey: ['/api/phases', phaseIdNum, 'exercises'],
    enabled: !!phaseIdNum,
  });

  const { data: assessments = [], isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ['/api/phases', phaseIdNum, 'assessments'],
    enabled: !!phaseIdNum,
  });

  // Load existing journal entries for this phase
  const { data: journalEntries = [] } = useQuery<JournalEntry[]>({
    queryKey: ['/api/user/journal'],
    enabled: !!phaseIdNum,
  });

  // Find today's reflection entry
  useEffect(() => {
    const today = new Date().toDateString();
    const todayReflection = journalEntries.find(entry => 
      entry.phaseId === phaseIdNum && 
      new Date(entry.createdAt).toDateString() === today &&
      entry.title?.includes('Daily Reflection')
    );
    
    if (todayReflection && todayReflection.content) {
      try {
        const parsed = JSON.parse(todayReflection.content);
        setReflections({
          wins: parsed.wins || "",
          challenges: parsed.challenges || "", 
          intention: parsed.intention || ""
        });
      } catch (e) {
        // If content isn't JSON, treat as regular text
        setReflections(prev => ({ ...prev, wins: todayReflection.content }));
      }
    }
  }, [journalEntries, phaseIdNum]);

  const completeExerciseMutation = useMutation({
    mutationFn: async ({ exerciseId, responses }: { exerciseId: number; responses?: any }) => {
      const response = await apiRequest('PATCH', `/api/user/exercises/${exerciseId}/progress`, {
        isCompleted: true,
        responses: responses
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/progress', phaseIdNum] });
      toast({
        title: "Exercise completed!",
        description: "Great work on your healing journey.",
      });
    },
  });

  const submitAssessmentMutation = useMutation({
    mutationFn: async ({ assessmentId, responses }: { assessmentId: number; responses: any }) => {
      const response = await apiRequest('POST', `/api/user/assessments/${assessmentId}/results`, {
        answers: responses
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Assessment completed!",
        description: "Your responses have been saved and analyzed.",
      });
    },
  });

  const handleExerciseComplete = (exerciseId: number, responses?: any) => {
    completeExerciseMutation.mutate({ exerciseId, responses });
  };

  const handleAssessmentSubmit = (assessmentId: number, responses: any) => {
    submitAssessmentMutation.mutate({ assessmentId, responses });
  };

  // Save reflection mutation
  const saveReflectionMutation = useMutation({
    mutationFn: async (reflectionData: InsertJournalEntry) => {
      const response = await apiRequest('POST', '/api/user/journal', reflectionData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/journal'] });
      toast({
        title: "Reflection saved!",
        description: "Your thoughts have been safely stored.",
      });
      setIsSaving(false);
    },
    onError: () => {
      toast({
        title: "Failed to save",
        description: "Please try again.",
        variant: "destructive"
      });
      setIsSaving(false);
    }
  });

  const handleSaveReflection = () => {
    setIsSaving(true);
    const today = new Date();
    const reflectionContent = JSON.stringify(reflections);
    
    saveReflectionMutation.mutate({
      title: `Daily Reflection - Phase ${phaseIdNum}`,
      content: reflectionContent,
      phaseId: phaseIdNum,
      mood: null,
      energyLevel: null,
      isPrivate: true
    });
  };

  const handleReflectionChange = (field: string, value: string) => {
    setReflections(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Navigation helpers
  const handleNavigateToExercise = (exerciseId: number) => {
    setSelectedExerciseId(exerciseId);
    setActiveTab("exercises");
    
    // Scroll to exercise after tab switch
    setTimeout(() => {
      const exerciseElement = document.getElementById(`exercise-${exerciseId}`);
      if (exerciseElement) {
        exerciseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab);
    setSelectedExerciseId(null);
  };

  // Get navigation items based on actual exercises
  const getNavigationItems = () => {
    if (!exercises.length) return [];
    
    return [
      {
        id: exercises.find(e => e.title.includes("Understanding"))?.id || 1,
        title: "Understanding Your System",
        icon: "🧠",
        description: "Learn about nervous system states"
      },
      {
        id: exercises.find(e => e.title.includes("Grounding"))?.id || 2,
        title: "Grounding Techniques",
        icon: "🌱",
        description: "5-4-3-2-1 grounding method"
      },
      {
        id: exercises.find(e => e.title.includes("Breathing"))?.id || 3,
        title: "Breathing Regulation",
        icon: "💨",
        description: "Box breathing exercises"
      },
      {
        id: exercises.find(e => e.title.includes("Muscle"))?.id || 4,
        title: "Muscle Relaxation",
        icon: "💪",
        description: "Progressive relaxation practice"
      },
      {
        id: exercises.find(e => e.title.includes("Assessment"))?.id || 7,
        title: "Window Assessment",
        icon: "📊",
        description: "Tolerance window evaluation"
      }
    ];
  };

  const getPhaseContent = () => {
    const content = {
      1: {
        title: "Pause the Panic",
        subtitle: "Learning to Regulate Your Nervous System", 
        description: "Your nervous system has been working overtime to protect you. Now it's time to teach it that you're safe.",
        keyLearning: "Understanding Trauma's Impact on Your Body",
        insights: [
          "Your hypervigilance served a purpose - it kept you safe",
          "Panic responses are your nervous system trying to protect you",
          "Regulation is possible with the right tools and practice"
        ]
      },
      2: {
        title: "Heal the Hurt", 
        subtitle: "Identifying and Processing Trauma Patterns",
        description: "Healing doesn't mean forgetting. It means integrating your experiences with compassion and wisdom.",
        keyLearning: "Recognizing Your Unique Trauma Responses",
        insights: [
          "Fight, flight, freeze, and fawn are all normal survival responses",
          "Your responses developed for good reasons",
          "Awareness is the first step toward healing"
        ]
      },
      3: {
        title: "Own Your Narrative",
        subtitle: "Rewriting Your Story from Survivor to Thriver", 
        description: "You are not what happened to you. You are how you've grown, learned, and survived.",
        keyLearning: "Transforming Victim Stories into Survivor Strength",
        insights: [
          "Your experiences have given you unique wisdom and strength",
          "Reframing doesn't minimize your pain - it honors your resilience",
          "You get to decide what your story means"
        ]
      },
      4: {
        title: "Empower Your Boundaries",
        subtitle: "Learning to Protect Your Energy with Love",
        description: "Boundaries aren't walls to keep people out - they're gates that let you choose who gets access to your energy.",
        keyLearning: "Understanding Healthy Boundary Setting",
        insights: [
          "Boundaries are self-care, not selfishness",
          "You can say no without explaining or justifying",
          "Healthy relationships respect boundaries"
        ]
      },
      5: {
        title: "Nurture the Brain",
        subtitle: "Understanding Neuroscience and Healing",
        description: "Your brain is incredibly adaptable. Understanding how trauma affects it helps you heal it.",
        keyLearning: "Neuroscience of Trauma and Recovery",
        insights: [
          "Neuroplasticity means your brain can create new, healthier patterns",
          "Sleep, nutrition, and movement are medicine for your brain",
          "Mindfulness practices literally reshape your neural pathways"
        ]
      },
      6: {
        title: "Integrate the Inner Self",
        subtitle: "Aligning Body, Mind, and Spirit",
        description: "True healing happens when all parts of you are working together in harmony.",
        keyLearning: "Connecting with Your Authentic Self",
        insights: [
          "Your body holds wisdom - learn to listen to it",
          "Spirituality can be a powerful source of healing",
          "Integration means accepting all parts of yourself"
        ]
      },
      7: {
        title: "eXpress Your New Identity",
        subtitle: "Stepping into Leadership and Purpose",
        description: "You've done the work. Now it's time to share your gifts with the world.",
        keyLearning: "Living from Your Healed Self",
        insights: [
          "Your healing journey can inspire and help others",
          "Leadership comes naturally when you're aligned with your values",
          "Your unique perspective is needed in this world"
        ]
      }
    };
    
    return content[phaseIdNum as keyof typeof content] || content[1];
  };

  // Show loading state
  if (phaseLoading || progressLoading || exercisesLoading || assessmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Phase {phaseIdNum}...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (phaseError || !phase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Phase not found</h1>
          <p className="text-gray-600 mb-4">Unable to load Phase {phaseIdNum}</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="phoenix-text-gray hover:phoenix-text-primary">
              <ArrowLeft className="mr-2" size={16} />
              Back to Overview
            </Button>
          </Link>
        </div>

        {/* Phase Header */}
        <div className="phoenix-gradient rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">{phase.letter}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Phase {phase.order}: {phase.name}</h1>
              <p className="text-xl text-white/90">{phase.description}</p>
            </div>
          </div>
          
          {progress && (
            <div className="bg-white/10 rounded-lg p-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Progress</span>
                <span className="text-sm">
                  {progress.exercisesCompleted} of {progress.totalExercises} exercises completed
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(progress.exercisesCompleted / progress.totalExercises) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-8">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <BookOpen size={16} />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center space-x-2">
                  <Target size={16} />
                  <span className="hidden sm:inline">Exercises</span>
                </TabsTrigger>
                <TabsTrigger value="assessments" className="flex items-center space-x-2">
                  <Heart size={16} />
                  <span className="hidden sm:inline">Assess</span>
                </TabsTrigger>
                <TabsTrigger value="reflect" className="flex items-center space-x-2">
                  <Lightbulb size={16} />
                  <span className="hidden sm:inline">Reflect</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Today's Learning: {getPhaseContent().keyLearning}
                  </h2>
                  <p className="phoenix-text-gray mb-6">
                    {getPhaseContent().description}
                  </p>
                  
                  <Card className="bg-white rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                    <div className="space-y-4">
                      {getPhaseContent().insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 phoenix-bg-primary rounded-full mt-2"></div>
                          <p className="text-sm phoenix-text-gray">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="text-yellow-600" size={20} />
                      <h4 className="font-medium text-yellow-800">Trauma-Informed Reminder</h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Healing isn't linear. Some days will feel harder than others, and that's completely normal. 
                      Be gentle with yourself as you practice these new skills.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="exercises">
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Exercises</h2>
                    <p className="phoenix-text-gray">
                      Complete these exercises at your own pace. Each one builds on the previous to deepen your understanding.
                    </p>
                  </div>
                  
                  {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                      <div 
                        key={exercise.id} 
                        id={`exercise-${exercise.id}`}
                        className={selectedExerciseId === exercise.id ? "ring-2 ring-blue-500 rounded-lg" : ""}
                      >
                        <ExerciseCard
                          exercise={exercise}
                          onComplete={handleExerciseComplete}
                        />
                      </div>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <p className="phoenix-text-gray text-lg mb-4">No exercises available yet for this phase.</p>
                      <p className="phoenix-text-gray text-sm">
                        Check back soon as we continue adding interactive content to support your journey.
                      </p>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="assessments">
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Self-Assessments</h2>
                    <p className="phoenix-text-gray">
                      These assessments help you understand your current patterns and track your progress.
                    </p>
                  </div>
                  
                  {assessments.length > 0 ? (
                    assessments.map((assessment) => (
                      <InteractiveAssessment
                        key={assessment.id}
                        assessment={assessment}
                        onSubmit={(responses) => handleAssessmentSubmit(assessment.id, responses)}
                      />
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <p className="phoenix-text-gray text-lg mb-4">No assessments available yet for this phase.</p>
                      <p className="phoenix-text-gray text-sm">
                        Assessment tools are being developed to help you understand your unique patterns and progress.
                      </p>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reflect">
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Reflection Space</h2>
                    <Button 
                      onClick={handleSaveReflection}
                      disabled={isSaving || saveReflectionMutation.isPending}
                      className="phoenix-bg-primary hover:phoenix-bg-secondary text-white"
                    >
                      <Save className="mr-2" size={16} />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-pink-50 rounded-lg p-6">
                      <h3 className="font-semibold text-pink-900 mb-3">Today's Wins</h3>
                      <p className="text-pink-800 text-sm mb-4">What felt good today? Even small moments count.</p>
                      <Textarea
                        placeholder="Write about your wins today... What made you feel proud or accomplished?"
                        className="min-h-[80px] resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        value={reflections.wins}
                        onChange={(e) => handleReflectionChange('wins', e.target.value)}
                      />
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-semibold text-blue-900 mb-3">Challenges & Learning</h3>
                      <p className="text-blue-800 text-sm mb-4">What was difficult? What did it teach you about yourself?</p>
                      <Textarea
                        placeholder="Reflect on your challenges... What patterns did you notice? What insights emerged?"
                        className="min-h-[80px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={reflections.challenges}
                        onChange={(e) => handleReflectionChange('challenges', e.target.value)}
                      />
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="font-semibold text-green-900 mb-3">Tomorrow's Intention</h3>
                      <p className="text-green-800 text-sm mb-4">How will you apply what you learned today?</p>
                      <Textarea
                        placeholder="Set your intention for tomorrow... How will you use today's insights?"
                        className="min-h-[80px] resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                        value={reflections.intention}
                        onChange={(e) => handleReflectionChange('intention', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-6">
                    <Button 
                      onClick={handleSaveReflection}
                      disabled={isSaving || saveReflectionMutation.isPending}
                      className="flex-1 phoenix-bg-primary hover:phoenix-bg-secondary text-white"
                    >
                      <Save className="mr-2" size={16} />
                      {isSaving ? 'Saving Reflection...' : 'Save Reflection'}
                    </Button>
                    <Link href="/journal" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Continue in Full Journal
                      </Button>
                    </Link>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Phase Navigation */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                {getNavigationItems().map((item) => (
                  <Button 
                    key={item.id}
                    variant="ghost" 
                    className={`w-full justify-start text-left h-auto p-3 ${
                      selectedExerciseId === item.id 
                        ? "phoenix-bg-primary phoenix-text-white" 
                        : "phoenix-text-gray hover:phoenix-text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => handleNavigateToExercise(item.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg mt-0.5">{item.icon}</span>
                      <div className="text-left">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs opacity-75 mt-0.5">{item.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    activeTab === "assessments" 
                      ? "phoenix-bg-primary phoenix-text-white" 
                      : "phoenix-text-gray hover:phoenix-text-primary"
                  }`}
                  onClick={() => handleNavigateToTab("assessments")}
                >
                  📋 Assessments
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    activeTab === "reflect" 
                      ? "phoenix-bg-primary phoenix-text-white" 
                      : "phoenix-text-gray hover:phoenix-text-primary"
                  }`}
                  onClick={() => handleNavigateToTab("reflect")}
                >
                  💭 Reflection Space
                </Button>
              </div>
            </Card>

            {/* Quick Tools */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tools</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleNavigateToExercise(exercises.find(e => e.title.includes("Grounding"))?.id || 2)}
                >
                  🆘 Emergency Grounding
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleNavigateToExercise(exercises.find(e => e.title.includes("Breathing"))?.id || 3)}
                >
                  💨 Quick Breathing
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleNavigateToExercise(exercises.find(e => e.title.includes("Cold"))?.id || 5)}
                >
                  ❄️ Cold Water Reset
                </Button>
                <Link href="/resources">
                  <Button variant="outline" className="w-full">
                    📚 All Resources
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-teal-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Support?</h3>
              <p className="text-sm phoenix-text-gray mb-4">
                Remember, healing isn't linear. Be gentle with yourself as you practice new skills.
              </p>
              <Button variant="outline" className="w-full">
                💬 Contact Coach
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
