import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";
import type { AssessmentQuestion, AssessmentResponse } from "@/lib/types";

interface AssessmentProps {
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  onSubmit: (responses: AssessmentResponse[]) => void;
}

export function Assessment({ title, description, questions, onSubmit }: AssessmentProps) {
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);

  const handleResponseChange = (questionId: string, answer: string | number) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, answer } : r);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const handleSubmit = () => {
    onSubmit(responses);
  };

  const isComplete = responses.length === questions.length;

  return (
    <Card className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <p className="phoenix-text-gray mb-6">{description}</p>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id}>
            <Label className="block text-sm font-medium text-gray-900 mb-2">
              {index + 1}. {question.question}
            </Label>
            
            {question.type === 'radio' && question.options && (
              <RadioGroup
                value={responses.find(r => r.questionId === question.id)?.answer as string || ""}
                onValueChange={(value) => handleResponseChange(question.id, value)}
              >
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                      <Label htmlFor={`${question.id}-${optionIndex}`} className="text-sm phoenix-text-gray">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>
        ))}
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="text-yellow-600" size={20} />
            <h4 className="font-medium text-yellow-800">Trauma-Informed Insight</h4>
          </div>
          <p className="text-sm text-yellow-700">
            For trauma survivors, boundaries may feel foreign or dangerous. This is a normal response. Take your time and practice self-compassion.
          </p>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full phoenix-bg-primary text-white py-3 rounded-lg font-medium hover:phoenix-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Assessment
        </Button>
      </div>
    </Card>
  );
}
