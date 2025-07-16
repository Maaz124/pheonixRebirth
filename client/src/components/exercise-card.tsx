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
  Heart, Brain, Target, MessageCircle, Eye, Activity, Shield, Users, MessageSquare, Calendar
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
            {exercise.title === "Understanding Self-Compassion Neuroscience" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center">
                    <Brain className="mr-2" size={16} />
                    Self-Compassion Practice Lab
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current Challenge: What situation are you struggling with right now?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I made a mistake at work and I can't stop thinking about it', 'I'm feeling overwhelmed by everything on my plate', 'I'm comparing myself to others on social media'..."
                        className="min-h-[100px] resize-none"
                        value={responses.current_challenge || ""}
                        onChange={(e) => setResponses({...responses, current_challenge: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Critical Voice: What is your inner critic saying about this situation?
                      </Label>
                      <Textarea
                        placeholder="Example: 'You're so stupid, you always mess things up', 'Everyone else has it together except you', 'You should be able to handle this'..."
                        className="min-h-[100px] resize-none"
                        value={responses.critic_voice || ""}
                        onChange={(e) => setResponses({...responses, critic_voice: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Mindfulness Practice: Acknowledge your suffering without being consumed by it
                      </Label>
                      <Textarea
                        placeholder="Example: 'I notice I am suffering right now. This is a moment of pain. I can feel this difficulty without it overwhelming me'..."
                        className="min-h-[80px] resize-none"
                        value={responses.mindfulness_response || ""}
                        onChange={(e) => setResponses({...responses, mindfulness_response: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Common Humanity: How might others in your situation feel?
                      </Label>
                      <Textarea
                        placeholder="Example: 'This is a moment of suffering. Suffering is part of life. Many people feel this way when they make mistakes. I am not alone in this experience'..."
                        className="min-h-[80px] resize-none"
                        value={responses.common_humanity || ""}
                        onChange={(e) => setResponses({...responses, common_humanity: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Kindness: What would you tell a dear friend in this situation?
                      </Label>
                      <Textarea
                        placeholder="Example: 'May I be kind to myself in this moment. You're doing the best you can with what you know. Making mistakes is human. You deserve compassion and understanding'..."
                        className="min-h-[100px] resize-none"
                        value={responses.self_kindness || ""}
                        onChange={(e) => setResponses({...responses, self_kindness: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Compassion Component Focus: Which component feels most challenging?
                      </Label>
                      <RadioGroup
                        value={responses.challenging_component || ""}
                        onValueChange={(value) => setResponses({...responses, challenging_component: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mindfulness" id="mindfulness" />
                          <Label htmlFor="mindfulness">Mindfulness - Acknowledging pain without being overwhelmed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="common_humanity" id="common_humanity" />
                          <Label htmlFor="common_humanity">Common Humanity - Remembering others struggle too</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="self_kindness" id="self_kindness" />
                          <Label htmlFor="self_kindness">Self-Kindness - Speaking to myself with warmth</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all_equally" id="all_equally" />
                          <Label htmlFor="all_equally">All components feel equally challenging</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Physical Self-Compassion: Place your hand on your heart and offer yourself comfort
                      </Label>
                      <Textarea
                        placeholder="Example: 'Feeling the warmth of my hand on my heart, I offer myself this kindness. My heart is beating, I am alive, I am worthy of care'..."
                        className="min-h-[80px] resize-none"
                        value={responses.physical_compassion || ""}
                        onChange={(e) => setResponses({...responses, physical_compassion: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Compassion Comfort Level: How comfortable do you feel practicing self-compassion?
                      </Label>
                      <Slider
                        value={[responses.compassion_comfort || 4]}
                        onValueChange={(value) => setResponses({...responses, compassion_comfort: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very uncomfortable</span>
                        <span>Very comfortable</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Comfort Level: {responses.compassion_comfort || 4}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Integration Plan: How will you practice self-compassion this week?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I will place my hand on my heart when I notice self-criticism, practice the three components daily, speak to myself like a good friend'..."
                        className="min-h-[100px] resize-none"
                        value={responses.integration_plan || ""}
                        onChange={(e) => setResponses({...responses, integration_plan: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "The Inner Critic Transformation" ? (
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
            ) : exercise.title === "Shame Resilience Building" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6">
                  <h4 className="font-medium text-rose-900 mb-4 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Shame Resilience Builder
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Recognize Shame: What shame message are you hearing?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I am broken, I am too much, I am not enough, I should be ashamed of myself...'"
                        className="min-h-[100px] resize-none"
                        value={responses.shame_message || ""}
                        onChange={(e) => setResponses({...responses, shame_message: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reality Check: What would you tell a friend experiencing this shame?
                      </Label>
                      <Textarea
                        placeholder="Example: 'You are not broken. Making mistakes is human. You deserve compassion and understanding...'"
                        className="min-h-[100px] resize-none"
                        value={responses.friend_response || ""}
                        onChange={(e) => setResponses({...responses, friend_response: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reach Out Strategy: Who could you share this shame with safely?
                      </Label>
                      <RadioGroup
                        value={responses.support_person || ""}
                        onValueChange={(value) => setResponses({...responses, support_person: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="therapist" id="therapist" />
                          <Label htmlFor="therapist">Therapist or counselor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="trusted_friend" id="trusted_friend" />
                          <Label htmlFor="trusted_friend">Trusted friend</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="family_member" id="family_member" />
                          <Label htmlFor="family_member">Safe family member</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support_group" id="support_group" />
                          <Label htmlFor="support_group">Support group</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="journal" id="journal" />
                          <Label htmlFor="journal">Written reflection/journaling</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Speak Shame: How will you name this shame experience?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I am experiencing shame about my past. This is a shame story, not a fact about who I am. I am worthy of love and belonging...'"
                        className="min-h-[100px] resize-none"
                        value={responses.shame_narrative || ""}
                        onChange={(e) => setResponses({...responses, shame_narrative: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Shame Resilience Level: How confident do you feel in managing shame?
                      </Label>
                      <Slider
                        value={[responses.resilience_level || 3]}
                        onValueChange={(value) => setResponses({...responses, resilience_level: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Shame overwhelms me</span>
                        <span>I can work with shame</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Resilience: {responses.resilience_level || 3}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Perfectionism to Progress Mindset" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6">
                  <h4 className="font-medium text-amber-900 mb-4 flex items-center">
                    <Target className="mr-2" size={16} />
                    Perfectionism Recovery Lab
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Perfectionist Area: Where does perfectionism show up most in your life?
                      </Label>
                      <Select
                        value={responses.perfectionism_area || ""}
                        onValueChange={(value) => setResponses({...responses, perfectionism_area: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your main perfectionism area..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="work">Work and career performance</SelectItem>
                          <SelectItem value="appearance">Physical appearance and image</SelectItem>
                          <SelectItem value="relationships">Relationships and social interactions</SelectItem>
                          <SelectItem value="parenting">Parenting and family roles</SelectItem>
                          <SelectItem value="creative">Creative projects and self-expression</SelectItem>
                          <SelectItem value="healing">Healing and personal growth journey</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Perfectionist Thought: What does your perfectionist voice say?
                      </Label>
                      <Textarea
                        placeholder="Example: 'If I don't do this perfectly, people will think I'm incompetent. I have to get this exactly right or it's worthless...'"
                        className="min-h-[100px] resize-none"
                        value={responses.perfectionist_thought || ""}
                        onChange={(e) => setResponses({...responses, perfectionist_thought: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Progress Reframe: How could you reframe this with a progress mindset?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Good enough is actually good enough. I can learn from imperfect attempts. Progress matters more than perfection...'"
                        className="min-h-[100px] resize-none"
                        value={responses.progress_reframe || ""}
                        onChange={(e) => setResponses({...responses, progress_reframe: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        B+ Goal Setting: What would a B+ version of your goal look like?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Instead of writing the perfect email, I'll write a clear, helpful email in 10 minutes. Instead of the perfect presentation, I'll create something informative and authentic...'"
                        className="min-h-[100px] resize-none"
                        value={responses.b_plus_goal || ""}
                        onChange={(e) => setResponses({...responses, b_plus_goal: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Implementation Strategy: How will you practice progress over perfection this week?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I will set a timer for tasks, share imperfect work with a friend, celebrate B+ efforts, practice done is better than perfect...'"
                        className="min-h-[100px] resize-none"
                        value={responses.implementation_strategy || ""}
                        onChange={(e) => setResponses({...responses, implementation_strategy: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Progress Commitment: How committed are you to practicing progress over perfection?
                      </Label>
                      <Slider
                        value={[responses.progress_commitment || 5]}
                        onValueChange={(value) => setResponses({...responses, progress_commitment: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Still stuck in perfectionism</span>
                        <span>Fully committed to progress</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Commitment: {responses.progress_commitment || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Emotional Validation Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-lavender-50 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Emotion Validation Studio
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current Emotion: What emotion are you experiencing right now?
                      </Label>
                      <Select
                        value={responses.current_emotion || ""}
                        onValueChange={(value) => setResponses({...responses, current_emotion: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Name your current emotion..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anxiety">Anxiety or worry</SelectItem>
                          <SelectItem value="sadness">Sadness or grief</SelectItem>
                          <SelectItem value="anger">Anger or frustration</SelectItem>
                          <SelectItem value="fear">Fear or panic</SelectItem>
                          <SelectItem value="shame">Shame or guilt</SelectItem>
                          <SelectItem value="loneliness">Loneliness or isolation</SelectItem>
                          <SelectItem value="overwhelm">Overwhelm or stress</SelectItem>
                          <SelectItem value="numbness">Numbness or disconnection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Emotion Location: Where do you feel this emotion in your body?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Tight chest, shoulders up to my ears, butterflies in stomach, tension in my jaw...'"
                        className="min-h-[80px] resize-none"
                        value={responses.emotion_location || ""}
                        onChange={(e) => setResponses({...responses, emotion_location: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Emotion Context: What situation or trigger brought up this emotion?
                      </Label>
                      <Textarea
                        placeholder="Example: 'A difficult conversation with my partner, work stress, remembering a past trauma, feeling criticized...'"
                        className="min-h-[80px] resize-none"
                        value={responses.emotion_context || ""}
                        onChange={(e) => setResponses({...responses, emotion_context: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Validation Statement: Write a validating statement for your emotion
                      </Label>
                      <Textarea
                        placeholder="Example: 'It makes sense that I feel anxious about this situation. Anyone who has been through what I've been through would feel this way. My emotions are valid and important information...'"
                        className="min-h-[100px] resize-none"
                        value={responses.validation_statement || ""}
                        onChange={(e) => setResponses({...responses, validation_statement: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Emotional Need: What does this emotion need from you right now?
                      </Label>
                      <RadioGroup
                        value={responses.emotional_need || ""}
                        onValueChange={(value) => setResponses({...responses, emotional_need: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="comfort" id="comfort" />
                          <Label htmlFor="comfort">Comfort and soothing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="space" id="space" />
                          <Label htmlFor="space">Space and time to feel</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="action" id="action" />
                          <Label htmlFor="action">Action or change in situation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="connection" id="connection" />
                          <Label htmlFor="connection">Connection with others</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="understanding" id="understanding" />
                          <Label htmlFor="understanding">Understanding and clarity</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Validation Skill: How comfortable are you validating your own emotions?
                      </Label>
                      <Slider
                        value={[responses.validation_skill || 4]}
                        onValueChange={(value) => setResponses({...responses, validation_skill: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very uncomfortable</span>
                        <span>Very comfortable</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Comfort Level: {responses.validation_skill || 4}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Grief and Loss Integration" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Grief Integration Sanctuary
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        What Are You Grieving: What loss are you processing right now?
                      </Label>
                      <Select
                        value={responses.grief_type || ""}
                        onValueChange={(value) => setResponses({...responses, grief_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose what you are grieving..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="childhood">Lost childhood or innocence</SelectItem>
                          <SelectItem value="relationship">Relationship that ended or changed</SelectItem>
                          <SelectItem value="identity">Who you thought you were</SelectItem>
                          <SelectItem value="dreams">Dreams or plans that didn't happen</SelectItem>
                          <SelectItem value="safety">Sense of safety or trust</SelectItem>
                          <SelectItem value="family">Family relationships or dynamics</SelectItem>
                          <SelectItem value="health">Health or physical abilities</SelectItem>
                          <SelectItem value="future">Future you thought you would have</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Grief Story: What exactly did you lose, and what did it mean to you?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I lost my sense of safety when the abuse started. I lost the belief that the world was a safe place and that people could be trusted...'"
                        className="min-h-[120px] resize-none"
                        value={responses.grief_story || ""}
                        onChange={(e) => setResponses({...responses, grief_story: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Grief Waves: What triggers waves of grief for you?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Seeing happy families, anniversaries, certain songs, feeling vulnerable, witnessing trust between people...'"
                        className="min-h-[100px] resize-none"
                        value={responses.grief_triggers || ""}
                        onChange={(e) => setResponses({...responses, grief_triggers: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Honoring Your Loss: How can you honor what you have lost?
                      </Label>
                      <RadioGroup
                        value={responses.honoring_method || ""}
                        onValueChange={(value) => setResponses({...responses, honoring_method: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ritual" id="ritual" />
                          <Label htmlFor="ritual">Create a ritual or ceremony</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="letter" id="letter" />
                          <Label htmlFor="letter">Write a letter to what you lost</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="art" id="art" />
                          <Label htmlFor="art">Express grief through art or creativity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nature" id="nature" />
                          <Label htmlFor="nature">Spend time in nature with your grief</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sharing" id="sharing" />
                          <Label htmlFor="sharing">Share your grief story with someone safe</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Grief Wisdom: What has your grief taught you about yourself or life?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My grief has taught me how deeply I can love, how strong I actually am, how important it is to honor my feelings...'"
                        className="min-h-[100px] resize-none"
                        value={responses.grief_wisdom || ""}
                        onChange={(e) => setResponses({...responses, grief_wisdom: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Integration Readiness: How ready are you to carry this grief with compassion?
                      </Label>
                      <Slider
                        value={[responses.integration_readiness || 4]}
                        onValueChange={(value) => setResponses({...responses, integration_readiness: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Grief overwhelms me</span>
                        <span>I can hold grief with love</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Readiness: {responses.integration_readiness || 4}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Self-Forgiveness Journey" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Self-Forgiveness Practice
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        What Needs Forgiveness: What are you having trouble forgiving yourself for?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Staying in an abusive relationship too long, not protecting myself, trusting someone who hurt me, my reactions to trauma...'"
                        className="min-h-[100px] resize-none"
                        value={responses.forgiveness_issue || ""}
                        onChange={(e) => setResponses({...responses, forgiveness_issue: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Understanding Context: What circumstances led to this situation?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I was young and didn't know better, I was in survival mode, I was doing the best I could with what I knew then, I was trying to protect myself...'"
                        className="min-h-[100px] resize-none"
                        value={responses.context_understanding || ""}
                        onChange={(e) => setResponses({...responses, context_understanding: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Lessons Learned: What have you learned from this experience?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I learned to trust my instincts, I learned what red flags look like, I learned that I am stronger than I thought, I learned to prioritize my safety...'"
                        className="min-h-[100px] resize-none"
                        value={responses.lessons_learned || ""}
                        onChange={(e) => setResponses({...responses, lessons_learned: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Forgiveness Letter: Write a forgiveness letter to yourself
                      </Label>
                      <Textarea
                        placeholder="Example: 'Dear [Your name], I forgive you for... You were doing the best you could with what you knew. You were trying to survive and protect yourself. You are worthy of love and forgiveness...'"
                        className="min-h-[150px] resize-none"
                        value={responses.forgiveness_letter || ""}
                        onChange={(e) => setResponses({...responses, forgiveness_letter: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Moving Forward: How will you show yourself compassion going forward?
                      </Label>
                      <RadioGroup
                        value={responses.moving_forward || ""}
                        onValueChange={(value) => setResponses({...responses, moving_forward: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily_affirmations" id="daily_affirmations" />
                          <Label htmlFor="daily_affirmations">Daily self-compassion affirmations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gentle_inner_voice" id="gentle_inner_voice" />
                          <Label htmlFor="gentle_inner_voice">Practice speaking to myself with kindness</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="self_care_rituals" id="self_care_rituals" />
                          <Label htmlFor="self_care_rituals">Create nurturing self-care rituals</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="boundary_setting" id="boundary_setting" />
                          <Label htmlFor="boundary_setting">Set better boundaries to protect myself</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional_support" id="professional_support" />
                          <Label htmlFor="professional_support">Continue therapy or professional support</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Forgiveness Progress: How ready do you feel to forgive yourself?
                      </Label>
                      <Slider
                        value={[responses.forgiveness_readiness || 4]}
                        onValueChange={(value) => setResponses({...responses, forgiveness_readiness: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Still very hard</span>
                        <span>Ready to forgive myself</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Readiness: {responses.forgiveness_readiness || 4}/10</p>
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
            ) : exercise.title === "Nervous System Recovery Routines" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h4 className="font-medium text-indigo-900 mb-4 flex items-center">
                    <Calendar className="mr-2" size={16} />
                    Nervous System Care Plan Builder
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Morning Regulation Routine: What practices will you do each morning to start regulated?
                      </Label>
                      <Textarea
                        placeholder="Example: '5 minutes of box breathing, gentle stretching, checking in with my body, setting daily intentions...'"
                        className="min-h-[100px] resize-none"
                        value={responses.morning_routine || ""}
                        onChange={(e) => setResponses({...responses, morning_routine: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Midday Reset Practice: How will you recalibrate your nervous system during the day?
                      </Label>
                      <Select
                        value={responses.midday_practice || ""}
                        onValueChange={(value) => setResponses({...responses, midday_practice: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your midday reset..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breathing">2-3 minute breathing exercise</SelectItem>
                          <SelectItem value="body_scan">Quick body awareness scan</SelectItem>
                          <SelectItem value="movement">Gentle movement or stretching</SelectItem>
                          <SelectItem value="grounding">Grounding practice (feet on floor, etc.)</SelectItem>
                          <SelectItem value="anchoring">Use my safety anchors</SelectItem>
                          <SelectItem value="vagus">Vagus nerve stimulation technique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Stress Response Plan: What will you do when you notice nervous system activation?
                      </Label>
                      <Textarea
                        placeholder="Example: 'STOP what I am doing, take 3 deep breaths, check my nervous system state, use calming breath technique, find my safety anchor...'"
                        className="min-h-[100px] resize-none"
                        value={responses.stress_response_plan || ""}
                        onChange={(e) => setResponses({...responses, stress_response_plan: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Evening Wind-Down: How will you help your nervous system transition to rest?
                      </Label>
                      <Textarea
                        placeholder="Example: 'No screens 1 hour before bed, gentle journaling, body scan, gratitude practice, creating calm environment...'"
                        className="min-h-[100px] resize-none"
                        value={responses.evening_routine || ""}
                        onChange={(e) => setResponses({...responses, evening_routine: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Weekly Regulation Practices: What deeper practices will you do weekly for nervous system health?
                      </Label>
                      <RadioGroup
                        value={responses.weekly_practice || ""}
                        onValueChange={(value) => setResponses({...responses, weekly_practice: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nature_immersion" id="nature" />
                          <Label htmlFor="nature">Extended time in nature</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="somatic_session" id="somatic" />
                          <Label htmlFor="somatic">Longer somatic awareness practice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="creative_expression" id="creative" />
                          <Label htmlFor="creative">Creative expression (art, music, dance)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="social_connection" id="social" />
                          <Label htmlFor="social">Meaningful social connection</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional_support" id="professional" />
                          <Label htmlFor="professional">Professional bodywork or therapy</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Integration Obstacles: What challenges might interfere with your nervous system care routine?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Time pressure at work, family demands, forgetting when stressed, feeling silly doing practices, perfectionism about doing it right...'"
                        className="min-h-[100px] resize-none"
                        value={responses.integration_obstacles || ""}
                        onChange={(e) => setResponses({...responses, integration_obstacles: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Obstacle Solutions: How will you handle these challenges to maintain your practice?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Set phone reminders, start with just 2 minutes, practice during commute, remember that imperfect practice is better than no practice...'"
                        className="min-h-[120px] resize-none"
                        value={responses.obstacle_solutions || ""}
                        onChange={(e) => setResponses({...responses, obstacle_solutions: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Commitment Level: How committed are you to maintaining daily nervous system care?
                      </Label>
                      <Slider
                        value={[responses.commitment_level || 5]}
                        onValueChange={(value) => setResponses({...responses, commitment_level: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Low commitment</span>
                        <span>Total commitment</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Commitment: {responses.commitment_level || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Growth Inventory Assessment" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6">
                  <h4 className="font-medium text-pink-900 mb-4 flex items-center">
                    <Target className="mr-2" size={16} />
                    Phoenix Method Growth Review
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phase 1 - Pause the Panic: How well can you now regulate during overwhelming moments?
                      </Label>
                      <Slider
                        value={[responses.phase1_progress || 5]}
                        onValueChange={(value) => setResponses({...responses, phase1_progress: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>No improvement</span>
                        <span>Significant mastery</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Progress: {responses.phase1_progress || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phase 2 - Honor Your Humanity: How much more self-compassionate are you now?
                      </Label>
                      <Slider
                        value={[responses.phase2_progress || 5]}
                        onValueChange={(value) => setResponses({...responses, phase2_progress: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Still very self-critical</span>
                        <span>Very self-compassionate</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Progress: {responses.phase2_progress || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phase 3 - Observe Your Patterns: How aware are you now of your patterns and triggers?
                      </Label>
                      <Slider
                        value={[responses.phase3_progress || 5]}
                        onValueChange={(value) => setResponses({...responses, phase3_progress: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not aware</span>
                        <span>Very aware</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Progress: {responses.phase3_progress || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phase 4 - Establish Boundaries: How effectively can you set and maintain boundaries?
                      </Label>
                      <Slider
                        value={[responses.phase4_progress || 5]}
                        onValueChange={(value) => setResponses({...responses, phase4_progress: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very poor boundaries</span>
                        <span>Excellent boundaries</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Progress: {responses.phase4_progress || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phase 5 - Nurture Your Nervous System: How well can you regulate your nervous system?
                      </Label>
                      <Slider
                        value={[responses.phase5_progress || 5]}
                        onValueChange={(value) => setResponses({...responses, phase5_progress: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Poor regulation</span>
                        <span>Excellent regulation</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Progress: {responses.phase5_progress || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Greatest Transformation: What change are you most proud of?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I am most proud of learning to say no without guilt. This has transformed my relationships and energy levels...'"
                        className="min-h-[100px] resize-none"
                        value={responses.greatest_transformation || ""}
                        onChange={(e) => setResponses({...responses, greatest_transformation: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Life Integration Planning" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center">
                    <Target className="mr-2" size={16} />
                    Integration Action Planner
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Integration: How will you apply your skills in relationships?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I will practice using my communication scripts with my partner, maintain boundaries with my family, and seek healthier friendships...'"
                        className="min-h-[100px] resize-none"
                        value={responses.relationship_integration || ""}
                        onChange={(e) => setResponses({...responses, relationship_integration: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Work/Career Integration: How will you use these skills professionally?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I will set clear work boundaries, use nervous system regulation during meetings, and communicate more authentically with colleagues...'"
                        className="min-h-[100px] resize-none"
                        value={responses.work_integration || ""}
                        onChange={(e) => setResponses({...responses, work_integration: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Daily Self-Care Integration: What practices will you maintain daily?
                      </Label>
                      <Select
                        value={responses.daily_practice || ""}
                        onValueChange={(value) => setResponses({...responses, daily_practice: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your primary daily practice..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning_regulation">Morning nervous system regulation routine</SelectItem>
                          <SelectItem value="boundary_check">Daily boundary check-in and maintenance</SelectItem>
                          <SelectItem value="pattern_awareness">Evening pattern awareness reflection</SelectItem>
                          <SelectItem value="self_compassion">Daily self-compassion practice</SelectItem>
                          <SelectItem value="breathwork">Regular breathwork sessions</SelectItem>
                          <SelectItem value="integrated_approach">Combination of multiple practices</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Trigger Management Plan: How will you handle your known triggers differently?
                      </Label>
                      <Textarea
                        placeholder="Example: 'When I feel criticized, I will pause, breathe, check my nervous system state, and respond from my regulated self rather than react...'"
                        className="min-h-[100px] resize-none"
                        value={responses.trigger_management || ""}
                        onChange={(e) => setResponses({...responses, trigger_management: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Integration Confidence: How confident do you feel about implementing these changes?
                      </Label>
                      <Slider
                        value={[responses.integration_confidence || 5]}
                        onValueChange={(value) => setResponses({...responses, integration_confidence: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not confident</span>
                        <span>Very confident</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Confidence: {responses.integration_confidence || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Relationship Transformation Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
                  <h4 className="font-medium text-amber-900 mb-4 flex items-center">
                    <Users className="mr-2" size={16} />
                    Relationship Evolution Tracker
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Most Transformed Relationship: Which relationship has changed the most?
                      </Label>
                      <Select
                        value={responses.transformed_relationship || ""}
                        onValueChange={(value) => setResponses({...responses, transformed_relationship: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="romantic_partner">Romantic partner</SelectItem>
                          <SelectItem value="parent">Parent/caregiver</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Close friend</SelectItem>
                          <SelectItem value="coworker">Coworker/boss</SelectItem>
                          <SelectItem value="self">Relationship with myself</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Transformation Story: How has this relationship evolved?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My relationship with my mother has completely changed. I now set clear boundaries about topics we discuss, I do not take on her emotions, and I communicate from a place of love rather than fear...'"
                        className="min-h-[120px] resize-none"
                        value={responses.transformation_story || ""}
                        onChange={(e) => setResponses({...responses, transformation_story: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        New Communication Patterns: What do you do differently in conversations?
                      </Label>
                      <RadioGroup
                        value={responses.communication_changes || ""}
                        onValueChange={(value) => setResponses({...responses, communication_changes: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="boundaries" id="boundaries" />
                          <Label htmlFor="boundaries">I set and maintain clear boundaries</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="authentic" id="authentic" />
                          <Label htmlFor="authentic">I communicate more authentically and honestly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="regulated" id="regulated" />
                          <Label htmlFor="regulated">I stay regulated during difficult conversations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compassionate" id="compassionate" />
                          <Label htmlFor="compassionate">I respond with more compassion and less reactivity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="direct" id="direct" />
                          <Label htmlFor="direct">I communicate directly without over-explaining</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Challenges: What challenges do you still face in relationships?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I still struggle with guilt when setting boundaries with my family. Sometimes I worry about being too direct...'"
                        className="min-h-[80px] resize-none"
                        value={responses.relationship_challenges || ""}
                        onChange={(e) => setResponses({...responses, relationship_challenges: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Satisfaction: How satisfied are you with your relationships now?
                      </Label>
                      <Slider
                        value={[responses.relationship_satisfaction || 5]}
                        onValueChange={(value) => setResponses({...responses, relationship_satisfaction: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very unsatisfied</span>
                        <span>Very satisfied</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Satisfaction: {responses.relationship_satisfaction || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Phoenix Strengths Activation" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6">
                  <h4 className="font-medium text-red-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Phoenix Strengths Discovery
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Primary Phoenix Strength: Which strength has emerged most clearly from your healing journey?
                      </Label>
                      <Select
                        value={responses.primary_strength || ""}
                        onValueChange={(value) => setResponses({...responses, primary_strength: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your strongest Phoenix quality..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resilience">Resilience - Ability to bounce back and keep going</SelectItem>
                          <SelectItem value="empathy">Empathy - Deep understanding of others pain and healing</SelectItem>
                          <SelectItem value="intuition">Intuition - Heightened sensitivity to energy and truth</SelectItem>
                          <SelectItem value="authenticity">Authenticity - Commitment to genuine connection</SelectItem>
                          <SelectItem value="wisdom">Wisdom - Hard-earned insights about life and healing</SelectItem>
                          <SelectItem value="courage">Courage - Willingness to face truth and make changes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Strength Story: How has this strength developed through your healing journey?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My empathy has grown through understanding my own pain. I can now sense when others are struggling and offer genuine support without taking on their emotions...'"
                        className="min-h-[120px] resize-none"
                        value={responses.strength_story || ""}
                        onChange={(e) => setResponses({...responses, strength_story: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Strength Application: How do you use this strength in your daily life?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I use my intuition to make better decisions about relationships and work. I trust my gut feelings more and they guide me toward healthier choices...'"
                        className="min-h-[100px] resize-none"
                        value={responses.strength_application || ""}
                        onChange={(e) => setResponses({...responses, strength_application: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Sharing Your Strength: How comfortable are you sharing this strength to help others?
                      </Label>
                      <RadioGroup
                        value={responses.sharing_comfort || ""}
                        onValueChange={(value) => setResponses({...responses, sharing_comfort: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="not_ready" id="not_ready" />
                          <Label htmlFor="not_ready">Not ready to share - still developing this strength</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="close_circle" id="close_circle" />
                          <Label htmlFor="close_circle">Comfortable sharing with close friends and family</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="selective" id="selective" />
                          <Label htmlFor="selective">Selectively share when I sense someone could benefit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="openly" id="openly" />
                          <Label htmlFor="openly">Openly share to help others who are struggling</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mentor" id="mentor" />
                          <Label htmlFor="mentor">Ready to mentor or guide others in their healing</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Future Self Visioning" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6">
                  <h4 className="font-medium text-cyan-900 mb-4 flex items-center">
                    <Eye className="mr-2" size={16} />
                    Future Self Visualization
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Daily Life Vision: Describe a typical day when you are fully integrated and thriving
                      </Label>
                      <Textarea
                        placeholder="Example: 'I wake up feeling grounded and peaceful. I start my day with breathwork and set clear intentions. I move through my day with confidence, maintaining healthy boundaries naturally...'"
                        className="min-h-[120px] resize-none"
                        value={responses.daily_vision || ""}
                        onChange={(e) => setResponses({...responses, daily_vision: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Relationship Vision: How do you show up in relationships when fully integrated?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I am present and authentic in all my relationships. I communicate clearly and lovingly. I maintain healthy boundaries while staying open-hearted...'"
                        className="min-h-[100px] resize-none"
                        value={responses.relationship_vision || ""}
                        onChange={(e) => setResponses({...responses, relationship_vision: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Challenge Response Vision: How does your integrated self handle stress and difficulties?
                      </Label>
                      <Textarea
                        placeholder="Example: 'When challenges arise, I pause and breathe. I stay connected to my body and respond from a regulated place. I see challenges as opportunities for growth...'"
                        className="min-h-[100px] resize-none"
                        value={responses.challenge_vision || ""}
                        onChange={(e) => setResponses({...responses, challenge_vision: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Purpose Vision: What meaningful contribution are you making from your integrated state?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I use my healing journey to help other women find their strength. I create safe spaces for authentic connection. My presence itself becomes healing for others...'"
                        className="min-h-[100px] resize-none"
                        value={responses.purpose_vision || ""}
                        onChange={(e) => setResponses({...responses, purpose_vision: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Vision Clarity: How clear and compelling is this future vision for you?
                      </Label>
                      <Slider
                        value={[responses.vision_clarity || 5]}
                        onValueChange={(value) => setResponses({...responses, vision_clarity: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Vague and unclear</span>
                        <span>Crystal clear and compelling</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Clarity: {responses.vision_clarity || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Phoenix Gifts Assessment" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6">
                  <h4 className="font-medium text-yellow-900 mb-4 flex items-center">
                    <Heart className="mr-2" size={16} />
                    Phoenix Gifts Discovery
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Primary Phoenix Gift: Which gift has emerged most strongly from your healing journey?
                      </Label>
                      <Select
                        value={responses.primary_gift || ""}
                        onValueChange={(value) => setResponses({...responses, primary_gift: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your strongest Phoenix gift..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empathy">Empathy - Deep understanding and compassion for others in pain</SelectItem>
                          <SelectItem value="resilience">Resilience - Proven ability to overcome adversity and bounce back</SelectItem>
                          <SelectItem value="intuition">Intuition - Heightened sensitivity to energy, emotions, and truth</SelectItem>
                          <SelectItem value="authenticity">Authenticity - Commitment to genuine connection and honest living</SelectItem>
                          <SelectItem value="wisdom">Wisdom - Hard-earned insights about life, relationships, and healing</SelectItem>
                          <SelectItem value="courage">Courage - Willingness to face difficult truths and make changes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Gift Story: How did this gift develop through your healing journey?
                      </Label>
                      <Textarea
                        placeholder="Example: 'My empathy grew through experiencing deep pain myself. Now I can instantly recognize when someone is struggling and offer genuine understanding without taking on their emotions...'"
                        className="min-h-[120px] resize-none"
                        value={responses.gift_story || ""}
                        onChange={(e) => setResponses({...responses, gift_story: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Unique Perspective: What unique perspective do you have that others need to hear?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I understand how trauma affects the nervous system and can help others recognize when they are activated vs. shut down. I know it is possible to heal even from severe trauma...'"
                        className="min-h-[120px] resize-none"
                        value={responses.unique_perspective || ""}
                        onChange={(e) => setResponses({...responses, unique_perspective: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Gift Validation: How do you know this gift is real and valuable?
                      </Label>
                      <Textarea
                        placeholder="Example: 'People often come to me for advice, friends say I have a calming presence, I can help others see solutions they could not see before...'"
                        className="min-h-[100px] resize-none"
                        value={responses.gift_validation || ""}
                        onChange={(e) => setResponses({...responses, gift_validation: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Sharing Readiness: How ready are you to share this gift with others?
                      </Label>
                      <Slider
                        value={[responses.sharing_readiness || 5]}
                        onValueChange={(value) => setResponses({...responses, sharing_readiness: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not ready</span>
                        <span>Completely ready</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Readiness: {responses.sharing_readiness || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Purpose Exploration Practice" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-6">
                  <h4 className="font-medium text-emerald-900 mb-4 flex items-center">
                    <Target className="mr-2" size={16} />
                    Purpose Exploration Lab
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Service Format: Which way of serving others most appeals to you?
                      </Label>
                      <Select
                        value={responses.service_format || ""}
                        onValueChange={(value) => setResponses({...responses, service_format: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your preferred service format..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mentoring">One-on-one mentoring and guidance</SelectItem>
                          <SelectItem value="writing">Writing and sharing your story through books or blogs</SelectItem>
                          <SelectItem value="speaking">Speaking to groups about your experience and insights</SelectItem>
                          <SelectItem value="advocacy">Advocacy work to change systems or raise awareness</SelectItem>
                          <SelectItem value="teaching">Teaching others about healing, growth, or life skills</SelectItem>
                          <SelectItem value="creative">Creative expression through art, music, or other mediums</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Target Audience: Who do you most feel called to serve?
                      </Label>
                      <RadioGroup
                        value={responses.target_audience || ""}
                        onValueChange={(value) => setResponses({...responses, target_audience: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="trauma_survivors" id="trauma" />
                          <Label htmlFor="trauma">Other trauma survivors on their healing journey</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="women" id="women" />
                          <Label htmlFor="women">Women struggling with similar challenges</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general_public" id="general" />
                          <Label htmlFor="general">General public seeking growth and healing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professionals" id="professionals" />
                          <Label htmlFor="professionals">Professionals who work with trauma survivors</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="specific_group" id="specific" />
                          <Label htmlFor="specific">A specific group related to your experience</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Purpose Vision: What specific change do you want to create in the world?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I want to help other women recognize that they can heal from narcissistic abuse and create healthy relationships. I want to show them it is possible to trust themselves again...'"
                        className="min-h-[120px] resize-none"
                        value={responses.purpose_vision || ""}
                        onChange={(e) => setResponses({...responses, purpose_vision: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Energy Assessment: Which service activities give you energy vs. drain you?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I feel energized when I see someone have a breakthrough or aha moment. I get drained by large groups but love intimate one-on-one conversations...'"
                        className="min-h-[100px] resize-none"
                        value={responses.energy_assessment || ""}
                        onChange={(e) => setResponses({...responses, energy_assessment: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Purpose Excitement: How excited do you feel about this potential purpose?
                      </Label>
                      <Slider
                        value={[responses.purpose_excitement || 5]}
                        onValueChange={(value) => setResponses({...responses, purpose_excitement: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not excited</span>
                        <span>Extremely excited</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Excitement: {responses.purpose_excitement || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Living Your Purpose Planning" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center">
                    <Calendar className="mr-2" size={16} />
                    Purpose Action Planner
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Immediate Actions (Next 30 Days): What can you do right now to begin living your purpose?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Research organizations that work with trauma survivors, start a blog about my healing journey, reach out to 3 people I could mentor, join a speaking group...'"
                        className="min-h-[120px] resize-none"
                        value={responses.immediate_actions || ""}
                        onChange={(e) => setResponses({...responses, immediate_actions: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Short-term Goals (3-6 Months): What do you want to accomplish in the near future?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Complete my first speaking engagement, mentor 2-3 people, write 10 blog posts, complete training in trauma-informed coaching...'"
                        className="min-h-[120px] resize-none"
                        value={responses.short_term_goals || ""}
                        onChange={(e) => setResponses({...responses, short_term_goals: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Long-term Vision (1-2 Years): What is your bigger vision for purposeful living?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Lead workshops for trauma survivors, write a book about my healing journey, create an online course, develop a support community...'"
                        className="min-h-[120px] resize-none"
                        value={responses.long_term_vision || ""}
                        onChange={(e) => setResponses({...responses, long_term_vision: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Support Needed: What resources, training, or support do you need to succeed?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Trauma-informed coaching certification, public speaking training, website development help, ongoing therapy for my own healing...'"
                        className="min-h-[100px] resize-none"
                        value={responses.support_needed || ""}
                        onChange={(e) => setResponses({...responses, support_needed: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Self-Care Integration: How will you maintain your own healing while serving others?
                      </Label>
                      <Textarea
                        placeholder="Example: 'Continue my own therapy, maintain daily nervous system regulation practices, set clear boundaries on service hours, have monthly check-ins with my support team...'"
                        className="min-h-[100px] resize-none"
                        value={responses.self_care_plan || ""}
                        onChange={(e) => setResponses({...responses, self_care_plan: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Commitment Level: How committed are you to pursuing this purpose path?
                      </Label>
                      <Slider
                        value={[responses.purpose_commitment || 5]}
                        onValueChange={(value) => setResponses({...responses, purpose_commitment: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Low commitment</span>
                        <span>Total commitment</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Commitment: {responses.purpose_commitment || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Phoenix Legacy Visioning" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-6">
                  <h4 className="font-medium text-violet-900 mb-4 flex items-center">
                    <Eye className="mr-2" size={16} />
                    Legacy Vision Creator
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Personal Legacy: How do you want your healing to impact your immediate relationships?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I want my children to see that healing is possible, that they can break cycles of trauma. I want my partner to experience a truly present and authentic relationship...'"
                        className="min-h-[120px] resize-none"
                        value={responses.personal_legacy || ""}
                        onChange={(e) => setResponses({...responses, personal_legacy: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Community Impact: What contribution do you want to make to your local community?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I want to help create support groups for trauma survivors in my city. I want to advocate for trauma-informed practices in schools and workplaces...'"
                        className="min-h-[120px] resize-none"
                        value={responses.community_impact || ""}
                        onChange={(e) => setResponses({...responses, community_impact: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Global Ripple Effect: How might your story and gifts serve people beyond your immediate circle?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I want my story to reach women around the world who feel trapped in toxic relationships. I want to show them that they are not alone and that transformation is possible...'"
                        className="min-h-[120px] resize-none"
                        value={responses.global_impact || ""}
                        onChange={(e) => setResponses({...responses, global_impact: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Generational Legacy: What legacy do you want to leave for future generations?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I want future generations in my family to inherit emotional intelligence, healthy relationship patterns, and the knowledge that they are worthy of love...'"
                        className="min-h-[120px] resize-none"
                        value={responses.generational_legacy || ""}
                        onChange={(e) => setResponses({...responses, generational_legacy: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Legacy Motivation: How motivated are you to create this legacy?
                      </Label>
                      <Slider
                        value={[responses.legacy_motivation || 5]}
                        onValueChange={(value) => setResponses({...responses, legacy_motivation: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not motivated</span>
                        <span>Deeply motivated</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Motivation: {responses.legacy_motivation || 5}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : exercise.title === "Service Readiness Assessment" ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6">
                  <h4 className="font-medium text-teal-900 mb-4 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Service Readiness Evaluator
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Emotional Stability: How stable and regulated is your emotional state?
                      </Label>
                      <Slider
                        value={[responses.emotional_stability || 5]}
                        onValueChange={(value) => setResponses({...responses, emotional_stability: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Very unstable</span>
                        <span>Very stable</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Stability: {responses.emotional_stability || 5}/10</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Boundary Confidence: How well can you maintain boundaries while helping others?
                      </Label>
                      <RadioGroup
                        value={responses.boundary_confidence || ""}
                        onValueChange={(value) => setResponses({...responses, boundary_confidence: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weak" id="weak" />
                          <Label htmlFor="weak">Still struggle with boundaries - often take on others emotions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="developing" id="developing" />
                          <Label htmlFor="developing">Developing boundaries - sometimes slip but catching myself</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="good" id="good" />
                          <Label htmlFor="good">Good boundaries - generally maintain separation while caring</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="strong" id="strong" />
                          <Label htmlFor="strong">Strong boundaries - can help without taking on others pain</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Trigger Management: How aware and prepared are you for potential triggers in service work?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I know that hearing about severe abuse might trigger my own memories. I have a plan to pause, breathe, and ground myself. I have my therapist on speed dial...'"
                        className="min-h-[100px] resize-none"
                        value={responses.trigger_management || ""}
                        onChange={(e) => setResponses({...responses, trigger_management: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Support Systems: How strong are your support systems for your own continued healing?
                      </Label>
                      <RadioGroup
                        value={responses.support_strength || ""}
                        onValueChange={(value) => setResponses({...responses, support_strength: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="inadequate" id="inadequate" />
                          <Label htmlFor="inadequate">Inadequate - feel isolated and unsupported</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="developing" id="developing2" />
                          <Label htmlFor="developing2">Developing - have some support but need more</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="adequate" id="adequate" />
                          <Label htmlFor="adequate">Adequate - have therapist and some supportive relationships</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="strong" id="strong2" />
                          <Label htmlFor="strong2">Strong - have multiple layers of professional and personal support</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Areas for Growth: What areas do you need to strengthen before or while serving others?
                      </Label>
                      <Textarea
                        placeholder="Example: 'I need to strengthen my public speaking skills, learn more about professional boundaries, continue working on my own attachment patterns...'"
                        className="min-h-[100px] resize-none"
                        value={responses.growth_areas || ""}
                        onChange={(e) => setResponses({...responses, growth_areas: e.target.value})}
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Overall Readiness: How ready do you feel to begin serving others?
                      </Label>
                      <Slider
                        value={[responses.overall_readiness || 5]}
                        onValueChange={(value) => setResponses({...responses, overall_readiness: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Not ready</span>
                        <span>Completely ready</span>
                      </div>
                      <p className="text-center mt-2 font-medium">Readiness: {responses.overall_readiness || 5}/10</p>
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
            
            {content.variations && (
              <div className="bg-emerald-50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-900 mb-3 flex items-center">
                  <Target className="mr-2" size={16} />
                  Variations to Try
                </h4>
                <ul className="space-y-2">
                  {content.variations.map((variation: string, index: number) => (
                    <li key={index} className="text-emerald-800 text-sm flex items-start">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {variation}
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