import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Leaf, Heart, BookOpen, Clock, Play, Pause, 
  RotateCcw, CheckCircle2, Lightbulb 
} from "lucide-react";

interface QuickToolModalProps {
  tool: 'grounding' | 'journal' | 'compassion' | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickToolModal({ tool, isOpen, onClose }: QuickToolModalProps) {
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [responses, setResponses] = useState<any>({});
  const [timerCount, setTimerCount] = useState(0);

  const resetTool = () => {
    setStep(0);
    setIsActive(false);
    setResponses({});
    setTimerCount(0);
  };

  const GroundingTool = () => {
    const steps = [
      { 
        title: "5 Things You Can See", 
        instruction: "Look around and name 5 things you can see. Really focus on them.",
        prompt: "I can see..."
      },
      { 
        title: "4 Things You Can Touch", 
        instruction: "Touch 4 different textures around you. Notice how they feel.",
        prompt: "I can feel..."
      },
      { 
        title: "3 Things You Can Hear", 
        instruction: "Listen carefully and identify 3 sounds around you.",
        prompt: "I can hear..."
      },
      { 
        title: "2 Things You Can Smell", 
        instruction: "Take a moment to notice 2 different scents.",
        prompt: "I can smell..."
      },
      { 
        title: "1 Thing You Can Taste", 
        instruction: "Focus on the taste in your mouth or taste something nearby.",
        prompt: "I can taste..."
      }
    ];

    if (step >= steps.length) {
      return (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="text-teal-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Well Done!</h3>
          <p className="text-gray-600">You've completed the 5-4-3-2-1 grounding exercise. How do you feel now?</p>
          
          <div className="bg-teal-50 rounded-lg p-4">
            <Label className="text-sm font-medium text-teal-900 mb-2 block">Rate your current stress level (1-10):</Label>
            <Slider
              value={[responses.stressAfter || 5]}
              onValueChange={(value) => setResponses({ ...responses, stressAfter: value[0] })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-teal-700 mt-1">
              <span>1 - Very calm</span>
              <span>10 - Very stressed</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={resetTool} variant="outline" className="w-full">
              Practice Again
            </Button>
            <Button onClick={onClose} className="w-full phoenix-bg-primary text-white">
              Close
            </Button>
          </div>
        </div>
      );
    }

    const currentStep = steps[step];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="text-teal-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">5-4-3-2-1 Grounding</h3>
          <p className="text-gray-600">A simple technique to bring you back to the present moment</p>
        </div>

        <Progress value={((step + 1) / steps.length) * 100} className="h-2" />

        <Card className="p-6 bg-teal-50 border-teal-200">
          <h4 className="text-lg font-semibold text-teal-900 mb-2">{currentStep.title}</h4>
          <p className="text-teal-800 mb-4">{currentStep.instruction}</p>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-teal-900">{currentStep.prompt}</Label>
            <Textarea
              placeholder="Take your time to really notice..."
              className="bg-white border-teal-300"
              value={responses[`step_${step}`] || ""}
              onChange={(e) => setResponses({ ...responses, [`step_${step}`]: e.target.value })}
            />
          </div>
        </Card>

        <div className="flex gap-3">
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1">
              Previous
            </Button>
          )}
          <Button 
            onClick={() => setStep(step + 1)} 
            className="flex-1 phoenix-bg-primary text-white"
            disabled={!responses[`step_${step}`]?.trim()}
          >
            {step === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    );
  };

  const CompassionTool = () => {
    if (step === 0) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-pink-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Self-Compassion Break</h3>
            <p className="text-gray-600">A gentle practice for difficult moments</p>
          </div>

          <Card className="p-6 bg-pink-50 border-pink-200">
            <h4 className="text-lg font-semibold text-pink-900 mb-3">Before we begin...</h4>
            <p className="text-pink-800 mb-4">
              Think of a situation that's been difficult for you recently. It doesn't need to be overwhelming - 
              just something that brings up some stress or self-criticism.
            </p>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-pink-900">What's been challenging for you?</Label>
              <Textarea
                placeholder="Briefly describe the situation..."
                className="bg-white border-pink-300"
                value={responses.situation || ""}
                onChange={(e) => setResponses({ ...responses, situation: e.target.value })}
              />
            </div>
          </Card>

          <Button 
            onClick={() => setStep(1)} 
            className="w-full phoenix-bg-secondary text-white"
            disabled={!responses.situation?.trim()}
          >
            Begin Practice
          </Button>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Step 1: Mindfulness</h4>
            <p className="text-gray-600">Acknowledging this moment of suffering</p>
          </div>

          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <p className="text-yellow-800 text-center italic mb-4">
              "This is a moment of suffering. This is difficult. This is painful."
            </p>
            <p className="text-yellow-700 text-sm">
              Allow yourself to acknowledge that this is hard. You don't need to fix it right now, 
              just recognize that you're in pain.
            </p>
          </Card>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">
              How does it feel to acknowledge this difficulty without trying to fix it?
            </Label>
            <Textarea
              placeholder="Your reflection..."
              value={responses.mindfulness || ""}
              onChange={(e) => setResponses({ ...responses, mindfulness: e.target.value })}
            />
          </div>

          <Button 
            onClick={() => setStep(2)} 
            className="w-full phoenix-bg-secondary text-white"
          >
            Continue to Common Humanity
          </Button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Step 2: Common Humanity</h4>
            <p className="text-gray-600">Remembering that you're not alone</p>
          </div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <p className="text-blue-800 text-center italic mb-4">
              "Suffering is part of the human experience. Others have felt this way too. I'm not alone in this."
            </p>
            <p className="text-blue-700 text-sm">
              Everyone experiences difficulties, setbacks, and pain. Your struggle connects you to all of humanity, 
              not separates you from it.
            </p>
          </Card>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">
              What would you say to a dear friend going through this same situation?
            </Label>
            <Textarea
              placeholder="Your compassionate words..."
              value={responses.commonHumanity || ""}
              onChange={(e) => setResponses({ ...responses, commonHumanity: e.target.value })}
            />
          </div>

          <Button 
            onClick={() => setStep(3)} 
            className="w-full phoenix-bg-secondary text-white"
          >
            Continue to Self-Kindness
          </Button>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Step 3: Self-Kindness</h4>
            <p className="text-gray-600">Offering yourself the same compassion you'd give a friend</p>
          </div>

          <Card className="p-6 bg-green-50 border-green-200">
            <p className="text-green-800 text-center italic mb-4">
              "May I be kind to myself. May I give myself the compassion I need."
            </p>
            <p className="text-green-700 text-sm">
              Place your hands on your heart if that feels comfortable. Speak to yourself with the same 
              warmth and understanding you'd offer a beloved friend.
            </p>
          </Card>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">
              What kind, supportive words can you offer yourself right now?
            </Label>
            <Textarea
              placeholder="Your self-compassionate message..."
              value={responses.selfKindness || ""}
              onChange={(e) => setResponses({ ...responses, selfKindness: e.target.value })}
            />
          </div>

          <Button 
            onClick={() => setStep(4)} 
            className="w-full phoenix-bg-secondary text-white"
          >
            Complete Practice
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Heart className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Practice Complete</h3>
        <p className="text-gray-600">
          You've taken a moment to be truly kind to yourself. This is how healing happens - one compassionate moment at a time.
        </p>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="text-purple-600" size={20} />
            <h4 className="font-medium text-purple-800">Remember</h4>
          </div>
          <p className="text-sm text-purple-700">
            You can return to this practice anytime you're struggling. Self-compassion is a skill that grows stronger with practice.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={resetTool} variant="outline" className="w-full">
            Practice Again
          </Button>
          <Button onClick={onClose} className="w-full phoenix-bg-primary text-white">
            Close
          </Button>
        </div>
      </div>
    );
  };

  const JournalTool = () => {
    const prompts = [
      "What am I feeling right now, and where do I feel it in my body?",
      "What boundary did I honor today, even if it was small?",
      "What would I say to comfort my younger self right now?",
      "What am I grateful for in this moment?",
      "What do I need most right now to feel safe and cared for?"
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Quick Journal Check-In</h3>
          <p className="text-gray-600">A few minutes of reflection for your healing journey</p>
        </div>

        <div className="space-y-4">
          {prompts.map((prompt, index) => (
            <Card key={index} className="p-4 bg-blue-50 border-blue-200">
              <Label className="text-sm font-medium text-blue-900 mb-2 block">{prompt}</Label>
              <Textarea
                placeholder="Your thoughts..."
                className="bg-white border-blue-300 min-h-[60px]"
                value={responses[`prompt_${index}`] || ""}
                onChange={(e) => setResponses({ ...responses, [`prompt_${index}`]: e.target.value })}
              />
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <Button onClick={onClose} className="w-full phoenix-bg-primary text-white">
            Save to Journal
          </Button>
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </div>
    );
  };

  const renderTool = () => {
    switch (tool) {
      case 'grounding':
        return <GroundingTool />;
      case 'compassion':
        return <CompassionTool />;
      case 'journal':
        return <JournalTool />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {renderTool()}
      </DialogContent>
    </Dialog>
  );
}