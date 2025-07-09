import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  BookOpen, Play, CheckCircle2, Clock, Lightbulb,
  Heart, Brain, Target, MessageCircle 
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
      case 'reading':
        return <BookOpen className="phoenix-text-primary" size={20} />;
      case 'practice':
        return <Play className="phoenix-text-accent" size={20} />;
      case 'assessment':
        return <Brain className="phoenix-text-secondary" size={20} />;
      case 'reflection':
        return <Heart className="phoenix-text-warning" size={20} />;
      default:
        return <Target className="phoenix-text-gray" size={20} />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      reading: "bg-blue-50 text-blue-700",
      practice: "bg-teal-50 text-teal-700", 
      assessment: "bg-pink-50 text-pink-700",
      reflection: "bg-yellow-50 text-yellow-700"
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
                Reflection Prompts
              </h4>
              {content.prompts.map((prompt: string, index: number) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{prompt}</Label>
                  <Textarea
                    placeholder="Take your time to reflect..."
                    className="min-h-[80px]"
                    value={responses[`prompt_${index}`] || ""}
                    onChange={(e) => setResponses({
                      ...responses,
                      [`prompt_${index}`]: e.target.value
                    })}
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
        <div className="space-y-4">
          {content.questions && (
            <div className="space-y-4">
              {content.questions.map((question: string, index: number) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{question}</Label>
                  <Textarea
                    placeholder="Your response..."
                    className="min-h-[60px]"
                    value={responses[`question_${index}`] || ""}
                    onChange={(e) => setResponses({
                      ...responses,
                      [`question_${index}`]: e.target.value
                    })}
                  />
                </div>
              ))}
            </div>
          )}
          
          {content.categories && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Rate each area (1-10):</h4>
              {content.categories.map((category: string, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm font-medium text-gray-700">{category} Boundaries</Label>
                    <span className="text-sm text-gray-600">{responses[`category_${index}`] || 5}/10</span>
                  </div>
                  <Slider
                    value={[responses[`category_${index}`] || 5]}
                    onValueChange={(value) => setResponses({
                      ...responses,
                      [`category_${index}`]: value[0]
                    })}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
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