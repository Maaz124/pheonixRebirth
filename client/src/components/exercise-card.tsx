import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Play, CheckCircle2, Clock, Lightbulb,
  Heart, Brain, Target, MessageCircle, Eye, Activity
} from "lucide-react";
import type { Exercise } from "@shared/schema";

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted?: boolean;
  onComplete: (exerciseId: number, responses?: any) => void;
}

export function ExerciseCard({ exercise, isCompleted = false, onComplete }: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [responses, setResponses] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'educational':
        return <BookOpen className="text-blue-600" size={20} />;
      case 'interactive':
        return <Play className="text-teal-600" size={20} />;
      case 'assessment':
        return <Brain className="text-purple-600" size={20} />;
      case 'planning':
        return <Target className="text-green-600" size={20} />;
      case 'reflection':
        return <Heart className="text-pink-600" size={20} />;
      case 'reading':
        return <BookOpen className="text-blue-600" size={20} />;
      case 'practice':
        return <Play className="text-teal-600" size={20} />;
      default:
        return <Activity className="text-gray-600" size={20} />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      educational: "bg-blue-50 text-blue-700",
      interactive: "bg-teal-50 text-teal-700",
      assessment: "bg-purple-50 text-purple-700",
      planning: "bg-green-50 text-green-700",
      reflection: "bg-pink-50 text-pink-700",
      reading: "bg-blue-50 text-blue-700",
      practice: "bg-teal-50 text-teal-700"
    };
    return variants[type as keyof typeof variants] || "bg-gray-50 text-gray-700";
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    await onComplete(exercise.id, responses);
    setIsSubmitting(false);
  };

  const renderContent = () => {
    const content = exercise.content as any;
    console.log('Exercise content:', exercise.title, content);
    
    if (exercise.type === 'educational') {
      return (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="neuroscience">Neuroscience</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {content.keyPoints && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <Lightbulb className="mr-2" size={16} />
                  Key Learning Points
                </h4>
                <ul className="space-y-2">
                  {content.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="text-blue-800 text-sm flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="neuroscience" className="space-y-4">
            {content.neuroscience && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Brain className="mr-2" size={16} />
                  The Science Behind It
                </h4>
                <p className="text-purple-800 text-sm leading-relaxed">{content.neuroscience}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4">
            {content.practicalApplication && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                  <Target className="mr-2" size={16} />
                  Try This Today
                </h4>
                <p className="text-green-800 text-sm leading-relaxed">{content.practicalApplication}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      );
    }
    
    if (exercise.type === 'reading') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">{content.text}</p>
          {content.keyPoints && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                <Lightbulb className="mr-2" size={16} />
                Key Points
              </h4>
              <ul className="space-y-2">
                {content.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="text-blue-800 text-sm flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    if (exercise.type === 'interactive') {
      return (
        <Tabs defaultValue="instructions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="neuroscience">Why It Works</TabsTrigger>
            <TabsTrigger value="tips">Tips & Variations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions" className="space-y-4">
            {content.steps && (
              <div className="bg-teal-50 rounded-lg p-4">
                <h4 className="font-medium text-teal-900 mb-3 flex items-center">
                  <Play className="mr-2" size={16} />
                  Step-by-Step Instructions
                </h4>
                <ol className="space-y-2">
                  {content.steps.map((step: string, index: number) => (
                    <li key={index} className="text-teal-800 text-sm flex items-start">
                      <span className="w-6 h-6 bg-teal-200 text-teal-900 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            
            {content.instructions && (
              <div className="bg-teal-50 rounded-lg p-4">
                <h4 className="font-medium text-teal-900 mb-3 flex items-center">
                  <Play className="mr-2" size={16} />
                  Instructions
                </h4>
                <p className="text-teal-800 text-sm leading-relaxed">{content.instructions}</p>
              </div>
            )}
            
            {content.visualization && (
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-medium text-indigo-900 mb-3 flex items-center">
                  <Eye className="mr-2" size={16} />
                  Visualization
                </h4>
                <p className="text-indigo-800 text-sm leading-relaxed">{content.visualization}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="neuroscience" className="space-y-4">
            {content.neuroscience && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Brain className="mr-2" size={16} />
                  The Science Behind It
                </h4>
                <p className="text-purple-800 text-sm leading-relaxed">{content.neuroscience}</p>
              </div>
            )}
            
            {content.science && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Brain className="mr-2" size={16} />
                  Additional Science
                </h4>
                <p className="text-purple-800 text-sm leading-relaxed">{content.science}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            {content.tips && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-3 flex items-center">
                  <Lightbulb className="mr-2" size={16} />
                  Helpful Tips
                </h4>
                <ul className="space-y-2">
                  {content.tips.map((tip: string, index: number) => (
                    <li key={index} className="text-yellow-800 text-sm flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {content.progressions && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                  <Target className="mr-2" size={16} />
                  Progressions
                </h4>
                <ul className="space-y-2">
                  {content.progressions.map((progression: string, index: number) => (
                    <li key={index} className="text-green-800 text-sm flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {progression}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {content.whenToUse && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <Clock className="mr-2" size={16} />
                  When to Use This
                </h4>
                <ul className="space-y-2">
                  {content.whenToUse.map((when: string, index: number) => (
                    <li key={index} className="text-blue-800 text-sm flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {when}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>
      );
    }

    if (exercise.type === 'practice') {
      return (
        <div className="space-y-4">
          {content.script && (
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-2">Guided Practice</h4>
              <p className="text-teal-800 italic">{content.script}</p>
            </div>
          )}
          
          {content.instructions && (
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-3 flex items-center">
                <Play className="mr-2" size={16} />
                Instructions
              </h4>
              <ol className="space-y-2">
                {content.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="text-teal-800 text-sm flex items-start">
                    <span className="w-6 h-6 bg-teal-200 text-teal-900 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {content.scenarios && content.scripts && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Practice Scenarios</h4>
              {content.scenarios.map((scenario: string, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 mb-2"><strong>Scenario:</strong> {scenario}</p>
                  <p className="text-gray-700 text-sm"><strong>Try saying:</strong> "{content.scripts[index] || content.scripts[0]}"</p>
                </div>
              ))}
            </div>
          )}

          {content.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2" size={16} />
              Duration: {content.duration}
            </div>
          )}
        </div>
      );
    }

    if (exercise.type === 'reflection') {
      return (
        <div className="space-y-4">
          {content.prompts && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <MessageCircle className="mr-2" size={16} />
                Reflective Space
              </h4>
              <p className="text-sm text-gray-600 mb-4">This is your private space for reflection. Take as much time as you need.</p>
              {content.prompts.map((prompt: string, index: number) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{prompt}</Label>
                  <Textarea
                    placeholder="Write your thoughts here... This is your private reflection space."
                    className="min-h-[100px] resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={responses[`prompt_${index}`] || ""}
                    onChange={(e) => {
                      console.log('Reflection textarea onChange:', e.target.value);
                      setResponses({
                        ...responses,
                        [`prompt_${index}`]: e.target.value
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (exercise.type === 'assessment') {
      return (
        <Tabs defaultValue="assessment" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="understanding">Understanding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assessment" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                <Brain className="mr-2" size={16} />
                Window of Tolerance Self-Assessment
              </h4>
              <p className="text-sm text-purple-700">Check the symptoms that apply to you right now. This helps identify which nervous system state you're in.</p>
            </div>
            
            {content.hyperarousal && (
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-3 flex items-center">
                  <Activity className="mr-2" size={16} />
                  HYPERAROUSAL (Fight/Flight Zone)
                </h4>
                <p className="text-xs text-red-600 mb-3">When your nervous system is activated beyond your window:</p>
                <div className="space-y-2">
                  {content.hyperarousal.map((sign: string, index: number) => (
                    <label key={index} className="flex items-center space-x-3 text-sm text-red-800 cursor-pointer hover:bg-red-100 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={responses.hyperarousal?.includes(sign) || false}
                        onChange={(e) => {
                          const current = responses.hyperarousal || [];
                          const updated = e.target.checked 
                            ? [...current, sign]
                            : current.filter((s: string) => s !== sign);
                          setResponses({...responses, hyperarousal: updated});
                        }}
                        className="rounded border-red-300 text-red-600 focus:ring-red-500"
                      />
                      <span>{sign}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {content.windowOfTolerance && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                  <Target className="mr-2" size={16} />
                  WINDOW OF TOLERANCE (Optimal Zone)
                </h4>
                <p className="text-xs text-green-600 mb-3">When your nervous system is balanced and regulated:</p>
                <div className="space-y-2">
                  {content.windowOfTolerance.map((sign: string, index: number) => (
                    <label key={index} className="flex items-center space-x-3 text-sm text-green-800 cursor-pointer hover:bg-green-100 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={responses.windowOfTolerance?.includes(sign) || false}
                        onChange={(e) => {
                          const current = responses.windowOfTolerance || [];
                          const updated = e.target.checked 
                            ? [...current, sign]
                            : current.filter((s: string) => s !== sign);
                          setResponses({...responses, windowOfTolerance: updated});
                        }}
                        className="rounded border-green-300 text-green-600 focus:ring-green-500"
                      />
                      <span>{sign}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {content.hypoarousal && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <Activity className="mr-2" size={16} />
                  HYPOAROUSAL (Freeze/Shutdown Zone)
                </h4>
                <p className="text-xs text-blue-600 mb-3">When your nervous system shuts down to protect you:</p>
                <div className="space-y-2">
                  {content.hypoarousal.map((sign: string, index: number) => (
                    <label key={index} className="flex items-center space-x-3 text-sm text-blue-800 cursor-pointer hover:bg-blue-100 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={responses.hypoarousal?.includes(sign) || false}
                        onChange={(e) => {
                          const current = responses.hypoarousal || [];
                          const updated = e.target.checked 
                            ? [...current, sign]
                            : current.filter((s: string) => s !== sign);
                          setResponses({...responses, hypoarousal: updated});
                        }}
                        className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{sign}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {content.practiceQuestions && Array.isArray(content.practiceQuestions) && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MessageCircle className="mr-2" size={16} />
                  Reflective Space
                </h4>
                <p className="text-sm text-gray-600 mb-4">Take your time to reflect on these questions. Your thoughts are private and help with your healing journey.</p>
                <div className="space-y-4">
                  {content.practiceQuestions.map((question: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">{question}</Label>
                      <Textarea
                        placeholder="Write your thoughts here... This is your private space for reflection."
                        className="min-h-[100px] resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        value={responses[`reflection_${index}`] || ""}
                        onChange={(e) => {
                          console.log('Textarea onChange triggered:', e.target.value);
                          setResponses({
                            ...responses,
                            [`reflection_${index}`]: e.target.value
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(responses.hyperarousal?.length > 0 || responses.windowOfTolerance?.length > 0 || responses.hypoarousal?.length > 0) && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Brain className="mr-2" size={16} />
                  Your Current Assessment
                </h4>
                
                {responses.hyperarousal?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-red-700 font-medium mb-1">Hyperarousal signs: {responses.hyperarousal.length}</p>
                    <p className="text-xs text-red-600">Your nervous system may be in fight/flight mode. Consider grounding techniques.</p>
                  </div>
                )}
                
                {responses.windowOfTolerance?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-green-700 font-medium mb-1">Window of tolerance signs: {responses.windowOfTolerance.length}</p>
                    <p className="text-xs text-green-600">Great! These indicate your nervous system is in a regulated state.</p>
                  </div>
                )}
                
                {responses.hypoarousal?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-blue-700 font-medium mb-1">Hypoarousal signs: {responses.hypoarousal.length}</p>
                    <p className="text-xs text-blue-600">Your nervous system may be in shutdown mode. Gentle movement can help.</p>
                  </div>
                )}
                
                <div className="text-xs text-purple-600 mt-3 pt-3 border-t border-purple-200">
                  💡 Remember: All responses are normal. This assessment helps you understand your current state so you can choose the right tools.
                </div>
              </div>
            )}
            
            {content.questions && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MessageCircle className="mr-2" size={16} />
                  Additional Questions
                </h4>
                {content.questions.map((question: string, index: number) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">{question}</Label>
                    <Textarea
                      placeholder="Share your thoughts here..."
                      className="min-h-[80px] resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      value={responses[`question_${index}`] || ""}
                      onChange={(e) => {
                        console.log('Question textarea onChange:', e.target.value);
                        setResponses({
                          ...responses,
                          [`question_${index}`]: e.target.value
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="understanding" className="space-y-4">
            {content.neuroscience && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Brain className="mr-2" size={16} />
                  The Science Behind This Assessment
                </h4>
                <p className="text-purple-800 text-sm leading-relaxed">{content.neuroscience}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      );
    }
    
    if (exercise.type === 'planning') {
      return (
        <Tabs defaultValue="planning" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="planning">Create Your Plan</TabsTrigger>
            <TabsTrigger value="science">Why This Works</TabsTrigger>
          </TabsList>
          
          <TabsContent value="planning" className="space-y-4">
            {content.protocolSteps && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                  <Target className="mr-2" size={16} />
                  Your Protocol Steps
                </h4>
                <ol className="space-y-2">
                  {content.protocolSteps.map((step: string, index: number) => (
                    <li key={index} className="text-green-800 text-sm flex items-start">
                      <span className="w-6 h-6 bg-green-200 text-green-900 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            
            {content.techniques && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <Heart className="mr-2" size={16} />
                  Choose Your Techniques
                </h4>
                <div className="space-y-3">
                  {content.techniques.map((technique: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label className="text-sm font-medium text-blue-700">{technique}</Label>
                      <Textarea
                        placeholder="Write your specific approach..."
                        className="min-h-[60px]"
                        value={responses[`technique_${index}`] || ""}
                        onChange={(e) => setResponses({
                          ...responses,
                          [`technique_${index}`]: e.target.value
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {content.practicePlan && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-3 flex items-center">
                  <Clock className="mr-2" size={16} />
                  Your Practice Plan
                </h4>
                <ul className="space-y-2">
                  {content.practicePlan.map((step: string, index: number) => (
                    <li key={index} className="text-yellow-800 text-sm flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="science" className="space-y-4">
            {content.neuroscience && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                  <Brain className="mr-2" size={16} />
                  The Science Behind It
                </h4>
                <p className="text-purple-800 text-sm leading-relaxed">{content.neuroscience}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      );
    }

    return null;
  };

  return (
    <Card className={`transition-all duration-200 ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'} ${isCompleted ? 'border-green-200 bg-green-50/30' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isCompleted ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {isCompleted ? (
                <CheckCircle2 className="text-green-600" size={20} />
              ) : (
                getTypeIcon(exercise.type)
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
                <Badge className={getTypeBadge(exercise.type)}>
                  {exercise.type}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm">{exercise.description}</p>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 space-y-6">
            {renderContent()}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {isCompleted ? "✓ Completed" : "Ready to begin"}
              </div>
              
              {!isCompleted && (
                <Button
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="phoenix-bg-primary hover:phoenix-bg-secondary text-white"
                >
                  {isSubmitting ? "Saving..." : "Mark Complete"}
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full phoenix-text-primary hover:phoenix-text-secondary"
          >
            {isExpanded ? "Collapse" : "Start Exercise"}
          </Button>
        </div>
      </div>
    </Card>
  );
}