import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Lightbulb, Brain, CheckCircle2, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import type { Assessment } from "@shared/schema";

interface InteractiveAssessmentProps {
  assessment: Assessment;
  onSubmit: (responses: any) => void;
}

export function InteractiveAssessment({ assessment, onSubmit }: InteractiveAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions = assessment.questions as any[];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleResponseChange = (questionId: string, answer: string | number | string[]) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentAnswers = (responses[questionId] as string[]) || [];
    const updatedAnswers = checked 
      ? [...currentAnswers, option]
      : currentAnswers.filter(answer => answer !== option);
    setResponses({ ...responses, [questionId]: updatedAnswers });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(responses);
    setIsSubmitting(false);
    setShowResults(true);
  };

  const getResults = () => {
    if (!assessment.scoringRubric) return null;
    
    const rubric = assessment.scoringRubric as any;
    
    if (assessment.title.includes("Boundary")) {
      const boundaryScore = Object.values(responses).reduce((sum: number, val: any) => sum + Number(val), 0) / Object.keys(responses).length;
      
      if (boundaryScore <= 3) {
        return {
          category: "Developing Boundaries",
          description: "You're learning to recognize your limits. This is a crucial first step in your healing journey.",
          color: "yellow",
          suggestions: [
            "Start with small, low-stakes situations to practice saying no",
            "Notice how your body feels when someone asks something of you",
            "Remember that boundaries are about self-care, not selfishness"
          ]
        };
      } else if (boundaryScore <= 6) {
        return {
          category: "Growing Boundaries",
          description: "You're making progress! You can recognize when boundaries are needed, and sometimes you act on it.",
          color: "blue",
          suggestions: [
            "Practice boundary scripts in safe relationships",
            "Work on reducing guilt around saying no", 
            "Celebrate small boundary wins"
          ]
        };
      } else {
        return {
          category: "Healthy Boundaries",
          description: "You have a strong foundation for healthy boundaries. Keep nurturing this skill.",
          color: "green",
          suggestions: [
            "Help others learn about boundaries through your example",
            "Fine-tune your boundary communication",
            "Continue practicing self-compassion"
          ]
        };
      }
    }

    if (assessment.title.includes("Nervous System")) {
      const dominantResponse = Object.values(responses).find(val => 
        Object.values(rubric).some((patterns: any) => patterns.includes(val))
      );
      
      let responseType = "Mixed Response";
      Object.entries(rubric).forEach(([key, patterns]) => {
        if ((patterns as string[]).includes(dominantResponse as string)) {
          responseType = key;
        }
      });

      const responseInfo = {
        fightResponse: {
          description: "You tend to meet stress with anger or confrontation. This response helped you survive, but may feel overwhelming now.",
          color: "red",
          suggestions: [
            "Practice grounding techniques when you feel anger rising",
            "Use physical exercise to release fight energy safely",
            "Learn to pause before reacting in conflict"
          ]
        },
        flightResponse: {
          description: "Your instinct is to escape or avoid stressful situations. This protected you, but may limit your life now.",
          color: "yellow", 
          suggestions: [
            "Practice staying present for short periods during mild stress",
            "Use breathing exercises to calm your nervous system",
            "Gradually expose yourself to manageable challenges"
          ]
        },
        freezeResponse: {
          description: "You tend to become immobilized when stressed. This kept you safe, but may feel frustrating now.",
          color: "blue",
          suggestions: [
            "Use movement to reconnect with your body",
            "Practice grounding techniques that engage your senses",
            "Start with tiny actions when you feel frozen"
          ]
        },
        fawnResponse: {
          description: "You try to please others to avoid conflict. This helped you survive, but may exhaust you now.",
          color: "pink",
          suggestions: [
            "Practice noticing your own needs and feelings",
            "Start with small moments of authenticity",
            "Remember that disappointing others sometimes is healthy"
          ]
        }
      };

      return responseInfo[responseType as keyof typeof responseInfo] || {
        description: "You show a mix of trauma responses, which is completely normal for survivors.",
        color: "purple",
        suggestions: [
          "Notice which response shows up in different situations",
          "Practice self-compassion for all your survival responses",
          "Work with a trauma-informed therapist when possible"
        ]
      };
    }

    return null;
  };

  if (showResults) {
    const results = getResults();
    
    return (
      <Card className="p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete</h3>
          <p className="text-gray-600">Thank you for your honest responses</p>
        </div>

        {results && (
          <div className="space-y-6">
            <div className={`bg-${results.color}-50 border border-${results.color}-200 rounded-lg p-6`}>
              <h4 className={`text-lg font-semibold text-${results.color}-900 mb-2`}>
                Your Pattern: {results.category}
              </h4>
              <p className={`text-${results.color}-800`}>{results.description}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Lightbulb className="mr-2" size={20} />
                Personalized Suggestions
              </h4>
              <ul className="space-y-2">
                {results.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="text-blue-800 text-sm flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="text-yellow-600" size={20} />
                <h4 className="font-medium text-yellow-800">Remember</h4>
              </div>
              <p className="text-sm text-yellow-700">
                These patterns developed to protect you. Healing happens gradually, with self-compassion and patience.
              </p>
            </div>
          </div>
        )}
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const hasResponse = () => {
    const response = responses[question.id];
    if (question.type === 'checkbox') {
      return response && Array.isArray(response) && response.length > 0;
    }
    if (question.type === 'text') {
      return response && response.toString().trim().length > 0;
    }
    return response !== undefined && response !== null && response !== '';
  };

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{assessment.title}</h3>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        <p className="text-gray-600 text-sm">{assessment.description}</p>
      </div>

      <div className="mb-8">
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          {question.question}
        </Label>

        {question.type === 'radio' && question.options && (
          <RadioGroup
            value={responses[question.id] || ""}
            onValueChange={(value) => handleResponseChange(question.id, value)}
          >
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label 
                    htmlFor={`${question.id}-${index}`} 
                    className="text-gray-700 cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {question.type === 'scale' && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-purple-600">
                {responses[question.id] || Math.floor((question.max + question.min) / 2)}
              </span>
            </div>
            <Slider
              value={[responses[question.id] || Math.floor((question.max + question.min) / 2)]}
              onValueChange={(value) => handleResponseChange(question.id, value[0])}
              max={question.max}
              min={question.min}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{question.labels?.[0] || question.min}</span>
              <span>{question.labels?.[1] || question.max}</span>
            </div>
          </div>
        )}

        {question.type === 'text' && (
          <Textarea
            placeholder="Take your time to reflect and share your thoughts..."
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="min-h-[120px] resize-none"
          />
        )}

        {question.type === 'checkbox' && question.options && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-3">Select all that apply:</p>
            {question.options.map((option: string, index: number) => (
              <label key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Checkbox
                  checked={(responses[question.id] as string[])?.includes(option) || false}
                  onCheckedChange={(checked) => handleCheckboxChange(question.id, option, checked as boolean)}
                />
                <span className="text-gray-700 flex-1">{option}</span>
              </label>
            ))}
            {responses[question.id] && responses[question.id].length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                {responses[question.id].length} item(s) selected
              </p>
            )}
          </div>
        )}

        {question.neuroscience && (
          <div className="bg-purple-50 rounded-lg p-4 mt-6 border border-purple-100">
            <div className="flex items-center text-purple-700 text-sm font-medium mb-2">
              <Brain className="mr-2" size={14} />
              The Science Behind This Question
            </div>
            <p className="text-purple-600 text-sm leading-relaxed">{question.neuroscience}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!hasResponse() || isSubmitting}
          className="phoenix-bg-primary hover:phoenix-bg-secondary text-white"
        >
          {isSubmitting ? "Submitting..." : 
           currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
        </Button>
      </div>
    </Card>
  );
}