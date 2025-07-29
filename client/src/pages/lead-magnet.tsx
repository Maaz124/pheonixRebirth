import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Download, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const assessmentQuestions = [
  {
    id: 1,
    question: "How often do you experience anxiety or panic attacks?",
    options: [
      { value: "daily", label: "Daily or multiple times per day", score: 4 },
      { value: "weekly", label: "Several times per week", score: 3 },
      { value: "monthly", label: "A few times per month", score: 2 },
      { value: "rarely", label: "Rarely or never", score: 1 }
    ]
  },
  {
    id: 2,
    question: "How difficult is it for you to set boundaries with others?",
    options: [
      { value: "impossible", label: "Nearly impossible - I always say yes", score: 4 },
      { value: "very_hard", label: "Very difficult and causes me stress", score: 3 },
      { value: "somewhat", label: "Somewhat difficult but manageable", score: 2 },
      { value: "easy", label: "Relatively easy for me", score: 1 }
    ]
  },
  {
    id: 3,
    question: "How would you describe your inner critic?",
    options: [
      { value: "harsh", label: "Constantly harsh and unforgiving", score: 4 },
      { value: "frequent", label: "Frequently critical and judgmental", score: 3 },
      { value: "occasional", label: "Occasionally critical but manageable", score: 2 },
      { value: "gentle", label: "Generally gentle and supportive", score: 1 }
    ]
  },
  {
    id: 4,
    question: "How often do you feel emotionally numb or disconnected?",
    options: [
      { value: "constantly", label: "Most of the time", score: 4 },
      { value: "often", label: "Often, especially during stress", score: 3 },
      { value: "sometimes", label: "Sometimes, but not consistently", score: 2 },
      { value: "rarely", label: "Rarely - I feel connected to my emotions", score: 1 }
    ]
  },
  {
    id: 5,
    question: "How safe do you feel in your current relationships?",
    options: [
      { value: "unsafe", label: "Often unsafe or walking on eggshells", score: 4 },
      { value: "sometimes_unsafe", label: "Sometimes unsafe, inconsistent", score: 3 },
      { value: "mostly_safe", label: "Mostly safe with some concerns", score: 2 },
      { value: "very_safe", label: "Very safe and supported", score: 1 }
    ]
  }
];

const phaseResults = {
  pause: {
    phase: "P - Pause the Panic",
    title: "You're in Survival Mode",
    description: "Your nervous system is stuck in fight-or-flight mode. You're likely experiencing frequent anxiety, panic attacks, or emotional overwhelm.",
    nextSteps: "Learning to regulate your nervous system and activate your body's natural calm response",
    color: "from-red-500 to-orange-500"
  },
  honor: {
    phase: "H - Honor Your Humanity", 
    title: "You're Ready for Self-Compassion",
    description: "You've begun to recognize your patterns but struggle with self-criticism and perfectionism. You're ready to develop radical self-acceptance.",
    nextSteps: "Developing self-compassion practices and learning to treat yourself with kindness",
    color: "from-orange-500 to-yellow-500"
  },
  observe: {
    phase: "O - Observe Your Patterns",
    title: "You're Ready to Break Cycles", 
    description: "You have some nervous system regulation but keep repeating the same patterns in relationships and life choices.",
    nextSteps: "Identifying your unconscious patterns and rewriting your internal programming",
    color: "from-yellow-500 to-green-500"
  },
  establish: {
    phase: "E - Establish Boundaries",
    title: "You're Ready for Boundary Mastery",
    description: "You understand your patterns but struggle to protect your energy and say no to others. Boundaries feel impossible or guilty.",
    nextSteps: "Learning to set and maintain healthy boundaries without guilt",
    color: "from-green-500 to-blue-500"
  },
  integrate: {
    phase: "I - Integrate Your Growth",
    title: "You're Ready to Embody Your Healing",
    description: "You have good awareness and some boundaries but haven't fully integrated your healing into your daily life and identity.",
    nextSteps: "Embodying your transformation and living from your healed self",
    color: "from-blue-500 to-purple-500"
  }
};

export default function LeadMagnet() {
  const [step, setStep] = useState<'info' | 'assessment' | 'results'>('info');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((total, answer) => {
      const question = assessmentQuestions.find(q => q.options.some(o => o.value === answer));
      const option = question?.options.find(o => o.value === answer);
      return total + (option?.score || 0);
    }, 0);

    const averageScore = totalScore / assessmentQuestions.length;
    
    if (averageScore >= 3.5) return phaseResults.pause;
    if (averageScore >= 3) return phaseResults.honor;
    if (averageScore >= 2.5) return phaseResults.observe;
    if (averageScore >= 2) return phaseResults.establish;
    return phaseResults.integrate;
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [assessmentQuestions[currentQuestion].id]: value });
    
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      const assessmentResults = calculateResults();
      setResults(assessmentResults);
      setStep('results');
    }
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/leads", {
        email,
        firstName,
        source: "lead_magnet",
        leadMagnet: "phoenix_assessment",
        assessmentResults: results
      });

      toast({
        title: "Success! Check your email",
        description: "Your personalized Phoenix Recovery Plan is on its way to your inbox.",
      });
      
      // In a real app, redirect to thank you page or download link
      window.location.href = "/pricing";
      
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = step === 'assessment' ? ((currentQuestion + 1) / assessmentQuestions.length) * 100 : 100;

  if (step === 'info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full border-2 border-orange-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Star className="text-white" size={32} />
            </div>
            <CardTitle className="text-3xl text-gray-900 mb-4">
              🔥 Free Phoenix Assessment
            </CardTitle>
            <CardDescription className="text-lg">
              Discover exactly where you are in your healing journey and get your personalized transformation roadmap in just 2 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Identify your current healing phase</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Discover your next breakthrough</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>Get personalized action steps</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span>100% free, no credit card required</span>
              </div>
            </div>
            
            <Button 
              onClick={() => setStep('assessment')}
              className="w-full h-12 text-lg bg-orange-600 hover:bg-orange-700"
            >
              Start My Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-gray-500 text-center">
              ⭐ Trusted by 10,000+ women • 📧 Results in 2 minutes • 🔒 Your privacy is protected
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'assessment') {
    const question = assessmentQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </p>
            </div>
            <CardTitle className="text-2xl text-gray-900">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full h-auto p-4 text-left justify-start hover:bg-orange-50 hover:border-orange-300"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full border-2 border-orange-200 shadow-xl">
          <CardHeader className="text-center">
            <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${results.color} rounded-full flex items-center justify-center`}>
              <CheckCircle className="text-white" size={32} />
            </div>
            <CardTitle className="text-3xl text-gray-900 mb-2">
              Your Phoenix Assessment Results
            </CardTitle>
            <div className="text-xl font-semibold text-orange-600 mb-2">
              {results.phase}
            </div>
            <CardDescription className="text-lg">
              {results.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">What this means for you:</h3>
              <p className="text-gray-700 mb-4">{results.description}</p>
              <h4 className="font-semibold text-gray-900 mb-2">Your next step:</h4>
              <p className="text-gray-700">{results.nextSteps}</p>
            </div>
            
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  🎁 Get Your Personalized Phoenix Recovery Plan
                </h3>
                <p className="text-gray-600 mb-4">
                  Enter your details below to receive your complete assessment results plus a customized action plan for your specific healing phase.
                </p>
              </div>
              
              <Input
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-12"
              />
              
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 text-lg bg-orange-600 hover:bg-orange-700"
              >
                {isSubmitting ? "Sending..." : "Get My Recovery Plan"}
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </form>
            
            <p className="text-sm text-gray-500 text-center">
              ✨ Instant access • 📧 Personalized roadmap • 🔒 No spam, ever
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}