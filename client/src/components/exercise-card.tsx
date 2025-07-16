import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Play, CheckCircle2, Clock, Lightbulb,
  Heart, Brain, Target, MessageCircle, Eye, Activity, Shield, Users, MessageSquare
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
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
          
          <TabsContent value="practice" className="space-y-4">
            {exercise.title === "The Inner Critic Transformation" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-teal-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Interactive RAIN Practice
                  </h4>
                  <p className="text-teal-800 text-sm mb-4">Practice transforming self-criticism with the RAIN technique:</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        1. Recognize: What critical thought are you having right now?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I'm such an idiot for making that mistake...'"
                        className="min-h-[80px] resize-none"
                        value={responses.critic_thought || ""}
                        onChange={(e) => setResponses({...responses, critic_thought: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        2. Allow: What are you feeling in your body right now?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Tension in my chest, shoulders tight, feeling heavy...'"
                        className="min-h-[80px] resize-none"
                        value={responses.body_feelings || ""}
                        onChange={(e) => setResponses({...responses, body_feelings: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        3. Investigate: What do you need right now?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I need compassion, understanding, a moment to breathe...'"
                        className="min-h-[80px] resize-none"
                        value={responses.needs || ""}
                        onChange={(e) => setResponses({...responses, needs: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        4. Nurture: Write a compassionate response to yourself
                      </Label>
                      <Textarea
                        placeholder="Example: 'It's okay to make mistakes. I'm learning and growing. May I be kind to myself...'"
                        className="min-h-[100px] resize-none"
                        value={responses.compassionate_response || ""}
                        onChange={(e) => setResponses({...responses, compassionate_response: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Somatic Self-Compassion Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-6">
                  <h4 className="font-medium text-pink-900 mb-4 flex items-center">
                    <Activity className="mr-2" size={16} />
                    Body-Based Compassion Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Body Scan: Where do you feel stress or tension in your body?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Tight shoulders, clenched jaw, butterflies in stomach...'"
                        className="min-h-[80px] resize-none"
                        value={responses.body_scan || ""}
                        onChange={(e) => setResponses({...responses, body_scan: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Soothing Touch: Rate your comfort level (1-10)
                      </Label>
                      <Slider
                        value={[responses.comfort_level || 5]}
                        onValueChange={(value) => setResponses({...responses, comfort_level: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Uncomfortable</span>
                        <span>Very Comfortable</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Current level: {responses.comfort_level || 5}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reflection: How did the soothing touch feel?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Calming, strange at first, made me feel cared for...'"
                        className="min-h-[80px] resize-none"
                        value={responses.touch_reflection || ""}
                        onChange={(e) => setResponses({...responses, touch_reflection: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Shame Resilience Building" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                  <h4 className="font-medium text-red-900 mb-4 flex items-center">
                    <Target className="mr-2" size={16} />
                    Shame Resilience Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Shame Trigger: What situation recently triggered shame for you?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Made a mistake at work and everyone saw...'"
                        className="min-h-[80px] resize-none"
                        value={responses.shame_trigger || ""}
                        onChange={(e) => setResponses({...responses, shame_trigger: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Physical Sensations: How did shame feel in your body?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Face flushed, wanted to hide, stomach dropped...'"
                        className="min-h-[80px] resize-none"
                        value={responses.shame_sensations || ""}
                        onChange={(e) => setResponses({...responses, shame_sensations: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reality Check: What would you tell a friend in this situation?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Everyone makes mistakes, you're still a good person...'"
                        className="min-h-[100px] resize-none"
                        value={responses.reality_check || ""}
                        onChange={(e) => setResponses({...responses, reality_check: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reaching Out: Who could you share this with for support?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My best friend, therapist, support group...'"
                        className="min-h-[80px] resize-none"
                        value={responses.support_network || ""}
                        onChange={(e) => setResponses({...responses, support_network: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Emotional Validation Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center">
                    <MessageCircle className="mr-2" size={16} />
                    Emotional Validation Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current Emotion: What are you feeling right now?
                      </Label>
                      <RadioGroup
                        value={responses.current_emotion || ""}
                        onValueChange={(value) => setResponses({...responses, current_emotion: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="anger" id="anger" />
                          <Label htmlFor="anger">Anger</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sadness" id="sadness" />
                          <Label htmlFor="sadness">Sadness</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fear" id="fear" />
                          <Label htmlFor="fear">Fear</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="shame" id="shame" />
                          <Label htmlFor="shame">Shame</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="joy" id="joy" />
                          <Label htmlFor="joy">Joy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Validation: Why is this emotion valid and important?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My anger is valid because my boundary was crossed...'"
                        className="min-h-[100px] resize-none"
                        value={responses.emotion_validation || ""}
                        onChange={(e) => setResponses({...responses, emotion_validation: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Compassion: What do you need right now?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I need to be gentle with myself, take some time to process...'"
                        className="min-h-[100px] resize-none"
                        value={responses.self_care_need || ""}
                        onChange={(e) => setResponses({...responses, self_care_need: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Emotional Trigger Mapping" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                  <h4 className="font-medium text-orange-900 mb-4 flex items-center">
                    <Target className="mr-2" size={16} />
                    Interactive Trigger Mapping
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Trigger 1: Identify your strongest emotional trigger
                      </Label>
                      <Textarea
                        placeholder="Example: 'Being criticized in front of others...'"
                        className="min-h-[60px] resize-none mb-3"
                        value={responses.trigger_1 || ""}
                        onChange={(e) => setResponses({...responses, trigger_1: e.target.value})}
                      />
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Physical sensations when this happens:
                      </Label>
                      <Textarea
                        placeholder="Example: 'Heart racing, face flushed, stomach tight...'"
                        className="min-h-[60px] resize-none mb-3"
                        value={responses.trigger_1_physical || ""}
                        onChange={(e) => setResponses({...responses, trigger_1_physical: e.target.value})}
                      />
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Typical thoughts that follow:
                      </Label>
                      <Textarea
                        placeholder="Example: 'I'm so stupid, everyone thinks I'm incompetent...'"
                        className="min-h-[60px] resize-none"
                        value={responses.trigger_1_thoughts || ""}
                        onChange={(e) => setResponses({...responses, trigger_1_thoughts: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Trigger 2: Another significant trigger
                      </Label>
                      <Textarea
                        placeholder="Example: 'Feeling ignored or excluded...'"
                        className="min-h-[60px] resize-none mb-3"
                        value={responses.trigger_2 || ""}
                        onChange={(e) => setResponses({...responses, trigger_2: e.target.value})}
                      />
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Your behavioral response:
                      </Label>
                      <Textarea
                        placeholder="Example: 'I withdraw and avoid everyone...'"
                        className="min-h-[60px] resize-none"
                        value={responses.trigger_2_behavior || ""}
                        onChange={(e) => setResponses({...responses, trigger_2_behavior: e.target.value})}
                      />
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Pattern Recognition: What do you notice about your triggers?
                      </Label>
                      <Textarea
                        placeholder="Example: 'They all relate to feeling judged or not good enough...'"
                        className="min-h-[80px] resize-none"
                        value={responses.pattern_insight || ""}
                        onChange={(e) => setResponses({...responses, pattern_insight: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "The Story Audit" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center">
                    <BookOpen className="mr-2" size={16} />
                    Interactive Story Examination
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Limiting Story: What negative story do you tell yourself most often?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I'm not smart enough to succeed...'"
                        className="min-h-[80px] resize-none"
                        value={responses.limiting_story || ""}
                        onChange={(e) => setResponses({...responses, limiting_story: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Evidence FOR this story:
                      </Label>
                      <Textarea
                        placeholder="List any evidence that seems to support this story..."
                        className="min-h-[80px] resize-none mb-3"
                        value={responses.evidence_for || ""}
                        onChange={(e) => setResponses({...responses, evidence_for: e.target.value})}
                      />
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Evidence AGAINST this story:
                      </Label>
                      <Textarea
                        placeholder="List evidence that contradicts this story..."
                        className="min-h-[80px] resize-none"
                        value={responses.evidence_against || ""}
                        onChange={(e) => setResponses({...responses, evidence_against: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Rewritten Story: How could you rewrite this story with compassion?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I am learning and growing. My intelligence shows up in unique ways...'"
                        className="min-h-[100px] resize-none"
                        value={responses.rewritten_story || ""}
                        onChange={(e) => setResponses({...responses, rewritten_story: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Behavioral Pattern Analysis" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4 flex items-center">
                    <Activity className="mr-2" size={16} />
                    Behavioral Pattern Tracker
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        When I'm stressed, I typically:
                      </Label>
                      <RadioGroup
                        value={responses.stress_behavior || ""}
                        onValueChange={(value) => setResponses({...responses, stress_behavior: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="isolate" id="isolate" />
                          <Label htmlFor="isolate">Isolate myself from others</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="overwork" id="overwork" />
                          <Label htmlFor="overwork">Overwork or stay busy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seek_support" id="seek_support" />
                          <Label htmlFor="seek_support">Seek support from others</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="avoid" id="avoid" />
                          <Label htmlFor="avoid">Avoid the stressor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ruminate" id="ruminate" />
                          <Label htmlFor="ruminate">Ruminate or worry</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Rate how helpful this behavior is (1-10):
                      </Label>
                      <Slider
                        value={[responses.behavior_helpfulness || 5]}
                        onValueChange={(value) => setResponses({...responses, behavior_helpfulness: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very harmful</span>
                        <span>Very helpful</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Rating: {responses.behavior_helpfulness || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Alternative Behavior: What's one healthier behavior you could try instead?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Take three deep breaths and call a trusted friend...'"
                        className="min-h-[80px] resize-none"
                        value={responses.alternative_behavior || ""}
                        onChange={(e) => setResponses({...responses, alternative_behavior: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Relationship Pattern Recognition" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Relationship Pattern Explorer
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Your typical role in relationships:
                      </Label>
                      <RadioGroup
                        value={responses.relationship_role || ""}
                        onValueChange={(value) => setResponses({...responses, relationship_role: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rescuer" id="rescuer" />
                          <Label htmlFor="rescuer">The Rescuer - Always helping others</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pleaser" id="pleaser" />
                          <Label htmlFor="pleaser">The People-Pleaser - Avoiding conflict</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="controller" id="controller" />
                          <Label htmlFor="controller">The Controller - Managing outcomes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="avoider" id="avoider" />
                          <Label htmlFor="avoider">The Avoider - Keeping distance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <Label htmlFor="balanced">Balanced - Healthy give and take</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Recurring Pattern: What pattern keeps showing up in your relationships?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I always end up feeling responsible for others' emotions...'"
                        className="min-h-[80px] resize-none"
                        value={responses.recurring_pattern || ""}
                        onChange={(e) => setResponses({...responses, recurring_pattern: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        New Response: How could you respond differently next time?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I could say: I care about you and I'm not responsible for fixing your problems...'"
                        className="min-h-[80px] resize-none"
                        value={responses.new_response || ""}
                        onChange={(e) => setResponses({...responses, new_response: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Thought Pattern Interruption" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
                  <h4 className="font-medium text-yellow-900 mb-4 flex items-center">
                    <Brain className="mr-2" size={16} />
                    Thought Pattern Interrupt Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Common Negative Thought: What negative thought visits you most often?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I always mess things up...'"
                        className="min-h-[60px] resize-none"
                        value={responses.negative_thought || ""}
                        onChange={(e) => setResponses({...responses, negative_thought: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Thought Pattern Type:
                      </Label>
                      <RadioGroup
                        value={responses.thought_pattern_type || ""}
                        onValueChange={(value) => setResponses({...responses, thought_pattern_type: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="catastrophizing" id="catastrophizing" />
                          <Label htmlFor="catastrophizing">Catastrophizing - Assuming the worst</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all_nothing" id="all_nothing" />
                          <Label htmlFor="all_nothing">All-or-Nothing - No middle ground</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mind_reading" id="mind_reading" />
                          <Label htmlFor="mind_reading">Mind Reading - Assuming others' thoughts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fortune_telling" id="fortune_telling" />
                          <Label htmlFor="fortune_telling">Fortune Telling - Predicting failure</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Interrupt Question: What question could you ask yourself to interrupt this thought?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Is this thought helpful? What evidence do I have?'"
                        className="min-h-[60px] resize-none"
                        value={responses.interrupt_question || ""}
                        onChange={(e) => setResponses({...responses, interrupt_question: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Replacement Thought: What more helpful thought could you practice instead?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I'm learning and improving. Mistakes help me grow.'"
                        className="min-h-[80px] resize-none"
                        value={responses.replacement_thought || ""}
                        onChange={(e) => setResponses({...responses, replacement_thought: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Boundary Types and Assessment" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Interactive Boundary Assessment
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Physical Boundaries: How comfortable are you setting limits around personal space and touch?
                      </Label>
                      <Slider
                        value={[responses.physical_boundaries || 5]}
                        onValueChange={(value) => setResponses({...responses, physical_boundaries: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very difficult</span>
                        <span>Very comfortable</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Rating: {responses.physical_boundaries || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Emotional Boundaries: How well do you protect yourself from taking on others' emotions?
                      </Label>
                      <Slider
                        value={[responses.emotional_boundaries || 5]}
                        onValueChange={(value) => setResponses({...responses, emotional_boundaries: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very poor</span>
                        <span>Very good</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Rating: {responses.emotional_boundaries || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Time Boundaries: How effectively do you protect your time from being overcommitted?
                      </Label>
                      <RadioGroup
                        value={responses.time_boundaries || ""}
                        onValueChange={(value) => setResponses({...responses, time_boundaries: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="poor" id="time_poor" />
                          <Label htmlFor="time_poor">I constantly overcommit and feel overwhelmed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fair" id="time_fair" />
                          <Label htmlFor="time_fair">I sometimes protect my time but often give in</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="good" id="time_good" />
                          <Label htmlFor="time_good">I usually protect my time effectively</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="excellent" id="time_excellent" />
                          <Label htmlFor="time_excellent">I consistently manage my time boundaries well</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Your Biggest Boundary Challenge: What type of boundary is most difficult for you?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I struggle most with saying no to family requests, especially from my mother...'"
                        className="min-h-[80px] resize-none"
                        value={responses.biggest_challenge || ""}
                        onChange={(e) => setResponses({...responses, biggest_challenge: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "The Guilt-Free No Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                  <h4 className="font-medium text-red-900 mb-4 flex items-center">
                    <MessageSquare className="mr-2" size={16} />
                    No Practice Scenarios
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Scenario: A friend asks you to help them move this weekend, but you planned to rest
                      </Label>
                      <Select
                        value={responses.scenario_1_response || ""}
                        onValueChange={(value) => setResponses({...responses, scenario_1_response: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your response..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes_guilt">"Sure, I guess I can help" (feeling guilty inside)</SelectItem>
                          <SelectItem value="no_over_explain">"I cannot help because I have been so stressed and really need to rest and..."</SelectItem>
                          <SelectItem value="no_simple">"I cannot help this weekend, but I hope it goes smoothly!"</SelectItem>
                          <SelectItem value="alternative">"I cannot help with moving, but I could bring lunch for everyone"</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Scenario: Your boss asks you to stay late again, but you have personal commitments
                      </Label>
                      <Select
                        value={responses.scenario_2_response || ""}
                        onValueChange={(value) => setResponses({...responses, scenario_2_response: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your response..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes_resentful">"Of course" (while feeling resentful)</SelectItem>
                          <SelectItem value="excuse">"I cannot because my dog needs to be walked and..."</SelectItem>
                          <SelectItem value="boundary">"I cannot stay late today. I can tackle this first thing tomorrow morning"</SelectItem>
                          <SelectItem value="negotiate">"I cannot stay late but I could come in early tomorrow if needed"</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Practice Your Own No: Write a situation where you need to say no
                      </Label>
                      <Textarea
                        placeholder="Describe a real situation where you need to set a boundary..."
                        className="min-h-[60px] resize-none mb-3"
                        value={responses.personal_situation || ""}
                        onChange={(e) => setResponses({...responses, personal_situation: e.target.value})}
                      />
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Your No Response:
                      </Label>
                      <Textarea
                        placeholder="Write how you would say no clearly and kindly..."
                        className="min-h-[60px] resize-none"
                        value={responses.personal_no_response || ""}
                        onChange={(e) => setResponses({...responses, personal_no_response: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Boundary Communication Scripts" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4 flex items-center">
                    <MessageSquare className="mr-2" size={16} />
                    Communication Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Type: Who do you most need to set boundaries with?
                      </Label>
                      <Select
                        value={responses.relationship_type || ""}
                        onValueChange={(value) => setResponses({...responses, relationship_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family">Family member</SelectItem>
                          <SelectItem value="romantic">Romantic partner</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="coworker">Coworker</SelectItem>
                          <SelectItem value="boss">Boss/Manager</SelectItem>
                          <SelectItem value="client">Client/Customer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Specific Boundary Needed: What boundary do you need to communicate?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I need to set a boundary about not being available for work calls after 6 PM...'"
                        className="min-h-[80px] resize-none"
                        value={responses.specific_boundary || ""}
                        onChange={(e) => setResponses({...responses, specific_boundary: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">Practice Script Framework:</h5>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs font-medium text-gray-600 mb-1 block">1. ACKNOWLEDGE</Label>
                          <Textarea
                            placeholder="I understand that you need/want..."
                            className="min-h-[50px] resize-none text-sm"
                            value={responses.acknowledge_script || ""}
                            onChange={(e) => setResponses({...responses, acknowledge_script: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-gray-600 mb-1 block">2. BOUNDARY</Label>
                          <Textarea
                            placeholder="However, I am not able/willing to..."
                            className="min-h-[50px] resize-none text-sm"
                            value={responses.boundary_script || ""}
                            onChange={(e) => setResponses({...responses, boundary_script: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-gray-600 mb-1 block">3. ALTERNATIVE (Optional)</Label>
                          <Textarea
                            placeholder="What I can do is... / Here is what works for me..."
                            className="min-h-[50px] resize-none text-sm"
                            value={responses.alternative_script || ""}
                            onChange={(e) => setResponses({...responses, alternative_script: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Workplace Boundary Scenarios" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-indigo-900 mb-4 flex items-center">
                    <Users className="mr-2" size={16} />
                    Workplace Boundary Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current Workplace Challenge: What boundary issue are you facing at work?
                      </Label>
                      <Select
                        value={responses.workplace_challenge || ""}
                        onValueChange={(value) => setResponses({...responses, workplace_challenge: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main challenge..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overtime">Constant requests to work overtime</SelectItem>
                          <SelectItem value="extra_tasks">Taking on others' responsibilities</SelectItem>
                          <SelectItem value="interruptions">Frequent interruptions during focused work</SelectItem>
                          <SelectItem value="personal_questions">Intrusive personal questions</SelectItem>
                          <SelectItem value="unrealistic_deadlines">Unrealistic deadline expectations</SelectItem>
                          <SelectItem value="availability">Being expected to be always available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Professional Response: How would you address this professionally?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I want to ensure I deliver quality work. My current workload means I cannot take on additional projects without compromising existing commitments...'"
                        className="min-h-[100px] resize-none"
                        value={responses.professional_response || ""}
                        onChange={(e) => setResponses({...responses, professional_response: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Boundary Confidence: How confident do you feel setting this boundary?
                      </Label>
                      <Slider
                        value={[responses.boundary_confidence || 5]}
                        onValueChange={(value) => setResponses({...responses, boundary_confidence: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not confident</span>
                        <span>Very confident</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Confidence: {responses.boundary_confidence || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Support Strategy: What support do you need to maintain this boundary?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I need to document these conversations, practice my responses, and have a backup plan for pushback...'"
                        className="min-h-[80px] resize-none"
                        value={responses.support_strategy || ""}
                        onChange={(e) => setResponses({...responses, support_strategy: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Relationship Boundary Dynamics" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Relationship Boundary Explorer
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Focus: Which relationship most needs boundary work?
                      </Label>
                      <Select
                        value={responses.relationship_focus || ""}
                        onValueChange={(value) => setResponses({...responses, relationship_focus: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent/Caregiver</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="partner">Romantic Partner</SelectItem>
                          <SelectItem value="child">Adult Child</SelectItem>
                          <SelectItem value="friend">Close Friend</SelectItem>
                          <SelectItem value="extended_family">Extended Family Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Boundary Violation Pattern: What pattern keeps happening in this relationship?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My mother calls constantly and gets upset if I do not answer immediately. She guilt trips me about not being available enough...'"
                        className="min-h-[100px] resize-none"
                        value={responses.violation_pattern || ""}
                        onChange={(e) => setResponses({...responses, violation_pattern: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Your Typical Response: How do you usually react to this pattern?
                      </Label>
                      <RadioGroup
                        value={responses.typical_response || ""}
                        onValueChange={(value) => setResponses({...responses, typical_response: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="give_in" id="give_in" />
                          <Label htmlFor="give_in">I usually give in to avoid conflict</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="angry" id="angry" />
                          <Label htmlFor="angry">I get angry and react emotionally</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="withdraw" id="withdraw" />
                          <Label htmlFor="withdraw">I withdraw and avoid the person</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="inconsistent" id="inconsistent" />
                          <Label htmlFor="inconsistent">I set boundaries but do not maintain them</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="clear" id="clear" />
                          <Label htmlFor="clear">I communicate boundaries clearly and kindly</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        New Boundary Strategy: What new approach will you try?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I will set specific call times and communicate that I check messages at set times. I will practice staying calm when she pushes back...'"
                        className="min-h-[100px] resize-none"
                        value={responses.new_strategy || ""}
                        onChange={(e) => setResponses({...responses, new_strategy: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Nervous System State Assessment" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                  <h4 className="font-medium text-emerald-900 mb-4 flex items-center">
                    <Activity className="mr-2" size={16} />
                    Nervous System State Check-In
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current State: How do you feel right now in your body?
                      </Label>
                      <RadioGroup
                        value={responses.current_state || ""}
                        onValueChange={(value) => setResponses({...responses, current_state: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ventral_vagal" id="ventral" />
                          <Label htmlFor="ventral">Calm and connected - I feel safe and present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sympathetic" id="sympathetic" />
                          <Label htmlFor="sympathetic">Activated - I feel anxious, tense, or on edge</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dorsal_vagal" id="dorsal" />
                          <Label htmlFor="dorsal">Shut down - I feel numb, tired, or disconnected</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mixed" id="mixed" />
                          <Label htmlFor="mixed">Mixed - I feel combinations of the above</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Activation Triggers: What situations typically activate your fight/flight response?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Conflict at work, loud sudden noises, feeling criticized, time pressure...'"
                        className="min-h-[80px] resize-none"
                        value={responses.activation_triggers || ""}
                        onChange={(e) => setResponses({...responses, activation_triggers: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Shutdown Triggers: What situations cause you to freeze or disconnect?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Overwhelming emotions, being yelled at, too many decisions, feeling unsafe...'"
                        className="min-h-[80px] resize-none"
                        value={responses.shutdown_triggers || ""}
                        onChange={(e) => setResponses({...responses, shutdown_triggers: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Body Awareness: Rate your current connection to body sensations
                      </Label>
                      <Slider
                        value={[responses.body_awareness || 5]}
                        onValueChange={(value) => setResponses({...responses, body_awareness: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very disconnected</span>
                        <span>Very connected</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Connection: {responses.body_awareness || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Breathwork for Regulation" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Breathwork Practice Studio
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Breathing Technique: Which technique would you like to practice?
                      </Label>
                      <Select
                        value={responses.breathing_technique || ""}
                        onValueChange={(value) => setResponses({...responses, breathing_technique: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a breathing technique..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="box_breathing">Box Breathing (4-4-4-4) - For balance and calm</SelectItem>
                          <SelectItem value="calming_breath">Calming Breath (4 in, 6-8 out) - To reduce activation</SelectItem>
                          <SelectItem value="energizing_breath">Energizing Breath - To gently activate when shut down</SelectItem>
                          <SelectItem value="natural_breath">Natural Breath Awareness - Simply observing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Practice Duration: How long did you practice?
                      </Label>
                      <RadioGroup
                        value={responses.practice_duration || ""}
                        onValueChange={(value) => setResponses({...responses, practice_duration: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1_min" id="1min" />
                          <Label htmlFor="1min">1 minute</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3_min" id="3min" />
                          <Label htmlFor="3min">3 minutes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5_min" id="5min" />
                          <Label htmlFor="5min">5 minutes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10_min" id="10min" />
                          <Label htmlFor="10min">10+ minutes</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Before Practice: How did you feel before starting the breathwork?
                      </Label>
                      <Slider
                        value={[responses.before_state || 5]}
                        onValueChange={(value) => setResponses({...responses, before_state: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very dysregulated</span>
                        <span>Very regulated</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Before: {responses.before_state || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        After Practice: How do you feel after the breathwork?
                      </Label>
                      <Slider
                        value={[responses.after_state || 5]}
                        onValueChange={(value) => setResponses({...responses, after_state: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very dysregulated</span>
                        <span>Very regulated</span>
                      </div>
                      <p className="text-center mt-2 font-medium">After: {responses.after_state || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Breathwork Observations: What did you notice during the practice?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My shoulders relaxed, my mind became quieter, I felt more present in my body...'"
                        className="min-h-[80px] resize-none"
                        value={responses.breathwork_observations || ""}
                        onChange={(e) => setResponses({...responses, breathwork_observations: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Somatic Awareness Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6">
                  <h4 className="font-medium text-orange-900 mb-4 flex items-center">
                    <Activity className="mr-2" size={16} />
                    Body Awareness Explorer
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Body Scan Practice: Take 2-3 minutes to scan through your body from head to toe
                      </Label>
                      <Textarea
                        placeholder="What do you notice? Tension in shoulders? Butterflies in stomach? Tingling? Warmth? Coolness? Describe any sensations..."
                        className="min-h-[100px] resize-none"
                        value={responses.body_scan_notes || ""}
                        onChange={(e) => setResponses({...responses, body_scan_notes: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Grounding Practice: How connected do you feel to your physical support (chair, floor)?
                      </Label>
                      <RadioGroup
                        value={responses.grounding_level || ""}
                        onValueChange={(value) => setResponses({...responses, grounding_level: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="not_grounded" id="not_grounded" />
                          <Label htmlFor="not_grounded">Not grounded - feel floating or disconnected</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="slightly_grounded" id="slightly_grounded" />
                          <Label htmlFor="slightly_grounded">Slightly grounded - some awareness of support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="well_grounded" id="well_grounded" />
                          <Label htmlFor="well_grounded">Well grounded - feel solidly supported</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="very_grounded" id="very_grounded" />
                          <Label htmlFor="very_grounded">Very grounded - feel deeply connected to earth</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Movement Preference: Which type of movement feels most regulating for you today?
                      </Label>
                      <Select
                        value={responses.movement_preference || ""}
                        onValueChange={(value) => setResponses({...responses, movement_preference: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose movement type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gentle_stretching">Gentle stretching and reaching</SelectItem>
                          <SelectItem value="shaking">Gentle shaking or bouncing</SelectItem>
                          <SelectItem value="rolling">Rolling shoulders or head circles</SelectItem>
                          <SelectItem value="walking">Walking or marching in place</SelectItem>
                          <SelectItem value="still">Staying still and present</SelectItem>
                          <SelectItem value="spontaneous">Whatever my body wants to do</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Somatic Regulation: After body awareness and movement, how regulated do you feel?
                      </Label>
                      <Slider
                        value={[responses.somatic_regulation || 5]}
                        onValueChange={(value) => setResponses({...responses, somatic_regulation: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Dysregulated</span>
                        <span>Well regulated</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Regulation: {responses.somatic_regulation || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Vagus Nerve Activation" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center">
                    <Brain className="mr-2" size={16} />
                    Vagus Nerve Activation Lab
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Technique Selection: Which vagus nerve technique would you like to try?
                      </Label>
                      <Select
                        value={responses.vagus_technique || ""}
                        onValueChange={(value) => setResponses({...responses, vagus_technique: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose technique..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="humming">Humming - Creates vibrations in chest and throat</SelectItem>
                          <SelectItem value="singing">Singing - Engages vocal cords and breathing</SelectItem>
                          <SelectItem value="gargling">Gargling - Activates throat muscles</SelectItem>
                          <SelectItem value="cold_water">Cold Water - Splash on face or wrists</SelectItem>
                          <SelectItem value="laughter">Laughter - Natural vagus stimulation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Practice Experience: How did the technique feel?
                      </Label>
                      <RadioGroup
                        value={responses.technique_experience || ""}
                        onValueChange={(value) => setResponses({...responses, technique_experience: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="uncomfortable" id="uncomfortable" />
                          <Label htmlFor="uncomfortable">Uncomfortable or activating</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="neutral" id="neutral" />
                          <Label htmlFor="neutral">Neutral - no strong effect</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pleasant" id="pleasant" />
                          <Label htmlFor="pleasant">Pleasant and calming</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="very_effective" id="very_effective" />
                          <Label htmlFor="very_effective">Very effective - felt immediate shift</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Physical Sensations: What did you notice in your body during the practice?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Felt vibrations in my chest, tingling in throat, warmth spreading, tension releasing...'"
                        className="min-h-[80px] resize-none"
                        value={responses.physical_sensations || ""}
                        onChange={(e) => setResponses({...responses, physical_sensations: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Vagal Tone: Rate how activated/strong your vagus nerve feels after this practice
                      </Label>
                      <Slider
                        value={[responses.vagal_tone || 5]}
                        onValueChange={(value) => setResponses({...responses, vagal_tone: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Weak/inactive</span>
                        <span>Strong/active</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Vagal Tone: {responses.vagal_tone || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Creating Safety Anchors" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Personal Safety Anchor Builder
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Sensory Safety: What do you see, hear, smell, touch, or taste that brings immediate comfort?
                      </Label>
                      <Textarea
                        placeholder="Example: 'The smell of lavender, soft blanket texture, sound of rain, warm tea, photo of my pet...'"
                        className="min-h-[80px] resize-none"
                        value={responses.sensory_anchors || ""}
                        onChange={(e) => setResponses({...responses, sensory_anchors: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Movement Safety: What physical positions or movements help you feel safe and grounded?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Feet flat on floor, back against wall, hands on heart, gentle rocking, walking barefoot...'"
                        className="min-h-[80px] resize-none"
                        value={responses.movement_anchors || ""}
                        onChange={(e) => setResponses({...responses, movement_anchors: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relational Safety: Who or what relationships help you feel most secure and supported?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My best friend Sarah, my dog Max, memories of my grandmother, supportive therapist...'"
                        className="min-h-[80px] resize-none"
                        value={responses.relational_anchors || ""}
                        onChange={(e) => setResponses({...responses, relational_anchors: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Environmental Safety: What places or spaces naturally calm your nervous system?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My bedroom corner, library, nature trails, coffee shop, bathroom (private space)...'"
                        className="min-h-[80px] resize-none"
                        value={responses.environmental_anchors || ""}
                        onChange={(e) => setResponses({...responses, environmental_anchors: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Most Accessible Anchor: Which safety anchor can you access most easily in stressful moments?
                      </Label>
                      <Select
                        value={responses.primary_anchor || ""}
                        onValueChange={(value) => setResponses({...responses, primary_anchor: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your most accessible anchor..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breath">Deep breathing</SelectItem>
                          <SelectItem value="touch">Self-touch (hand on heart, etc.)</SelectItem>
                          <SelectItem value="visualization">Visualizing safe place/person</SelectItem>
                          <SelectItem value="phrase">Calming phrase or mantra</SelectItem>
                          <SelectItem value="grounding">Physical grounding (feet on floor)</SelectItem>
                          <SelectItem value="sensory">Portable sensory item</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-teal-50 rounded-lg p-6">
                <h4 className="font-medium text-teal-900 mb-4 flex items-center">
                  <Play className="mr-2" size={16} />
                  Interactive Practice
                </h4>
                <p className="text-teal-800 text-sm mb-4">
                  This exercise includes interactive elements. Follow the instructions to complete the practice.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Reflection Notes:
                  </Label>
                  <Textarea
                    placeholder="Use this space to reflect on your practice..."
                    className="min-h-[120px] resize-none"
                    value={responses.reflection_notes || ""}
                    onChange={(e) => setResponses({...responses, reflection_notes: e.target.value})}
                  />
                </div>
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