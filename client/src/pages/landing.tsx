import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, Star, ArrowRight, Users, Award, Clock, Shield,
  Heart, Zap, Target, BookOpen, Play, Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const heroStats = [
  { number: "10,000+", label: "Women Transformed" },
  { number: "94%", label: "Success Rate" },
  { number: "90 Days", label: "Average Recovery" },
  { number: "4.9/5", label: "Client Rating" }
];

const painPoints = [
  "Constant anxiety and panic attacks that come from nowhere",
  "Feeling emotionally numb or overwhelmed by intense emotions", 
  "Difficulty setting boundaries and saying no to toxic people",
  "Perfectionism and self-criticism that never lets up",
  "Feeling like you're 'walking on eggshells' in relationships",
  "Replaying painful memories and conversations over and over",
  "Exhausted from always being 'on guard' and hypervigilant",
  "Feeling broken, damaged, or like healing is impossible"
];

const phoenixPhases = [
  {
    letter: "P",
    name: "Pause the Panic",
    description: "Learn to regulate your nervous system and stop living in constant fight-or-flight mode",
    icon: Shield,
    color: "from-red-500 to-orange-500"
  },
  {
    letter: "H", 
    name: "Honor Your Humanity",
    description: "Develop radical self-compassion and heal the harsh inner critic that keeps you stuck",
    icon: Heart,
    color: "from-orange-500 to-yellow-500"
  },
  {
    letter: "O",
    name: "Observe Your Patterns", 
    description: "Identify the unconscious patterns that keep you repeating the same cycles",
    icon: Target,
    color: "from-yellow-500 to-green-500"
  },
  {
    letter: "E",
    name: "Establish Boundaries",
    description: "Learn to protect your energy and say no without guilt or fear",
    icon: Shield,
    color: "from-green-500 to-blue-500"
  },
  {
    letter: "N",
    name: "Nurture Your Nervous System",
    description: "Master somatic practices that help your body feel safe and regulated",
    icon: Zap,
    color: "from-blue-500 to-purple-500"
  },
  {
    letter: "I",
    name: "Integrate Your Growth",
    description: "Embody your transformation and live from your healed, authentic self",
    icon: Star,
    color: "from-purple-500 to-pink-500"
  },
  {
    letter: "X",
    name: "eXamine Your Purpose",
    description: "Discover how your healed self serves the world and creates lasting meaning",
    icon: BookOpen,
    color: "from-pink-500 to-red-500"
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Denver, CO",
    quote: "I went from daily panic attacks to sleeping peacefully through the night. The Phoenix Method™ didn't just treat my symptoms - it transformed my entire relationship with myself.",
    result: "Panic-free in 8 weeks",
    rating: 5
  },
  {
    name: "Jennifer L.",
    location: "Austin, TX", 
    quote: "After 15 years of therapy, I finally found something that worked. I can set boundaries without guilt and actually feel worthy of love and respect.",
    result: "Healthy boundaries established",
    rating: 5
  },
  {
    name: "Maria R.",
    location: "Phoenix, AZ",
    quote: "I was skeptical at first, but the science-backed approach made all the difference. My relationships are healthier, my anxiety is manageable, and I actually like myself now.",
    result: "Complete life transformation",
    rating: 5
  }
];

const faqs = [
  {
    question: "How is this different from traditional therapy?",
    answer: "Traditional therapy often focuses on talking through problems, which can be helpful but doesn't address the nervous system dysregulation that underlies trauma. The Phoenix Method™ combines neuroscience-based techniques with trauma-informed coaching to rewire your brain at the neurological level, creating faster and more lasting change."
  },
  {
    question: "How long does it take to see results?",
    answer: "Most women begin to notice shifts within the first 2-3 weeks, with significant improvements by week 8. However, lasting transformation typically takes 6-12 months as you move through all 7 phases and integrate the changes into your daily life."
  },
  {
    question: "What if I've tried everything and nothing has worked?",
    answer: "Many of our most successful clients felt this way before starting. The Phoenix Method™ works differently because it addresses trauma at the nervous system level, not just the cognitive level. Our approach is specifically designed for women who haven't found success with traditional methods."
  },
  {
    question: "Is this a replacement for therapy or medication?",
    answer: "The Phoenix Method™ is a trauma-informed coaching program that complements but doesn't replace professional medical or psychological treatment. We recommend working with your healthcare providers and can provide support alongside your existing care team."
  }
];

export default function Landing() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/leads", {
        email,
        source: "landing_page",
        leadMagnet: "phoenix_assessment"
      });

      toast({
        title: "Success! Redirecting to your free assessment...",
        description: "Get ready to discover your current healing phase.",
      });
      
      // Redirect to assessment
      window.location.href = "/assessment";
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-700 hover:bg-orange-100">
            🔥 The Phoenix Method™ - As Seen in Psychology Today
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Trauma Into Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Greatest Strength</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            The only neuroscience-backed 7-phase program designed specifically for emotionally exhausted women rising from trauma, anxiety, and narcissistic abuse.
          </p>

          {/* Lead Capture CTA */}
          <Card className="max-w-2xl mx-auto mb-12 border-2 border-orange-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                🎁 Take Your Free Phoenix Assessment
              </CardTitle>
              <p className="text-gray-600 text-center">
                Discover exactly where you are in your healing journey and get your personalized transformation roadmap in just 2 minutes.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLeadCapture} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-lg"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-12 px-8 bg-orange-600 hover:bg-orange-700 text-lg font-semibold"
                >
                  {isSubmitting ? "Starting..." : "Get My Free Assessment"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4 text-center">
                ✨ Free assessment • 📧 Instant access • 🔒 No spam, ever
              </p>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {heroStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-orange-600">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Pain Points Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Are You Tired of Living in Survival Mode?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you're reading this, chances are you're struggling with the invisible wounds that keep you stuck, anxious, and emotionally exhausted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">You might be experiencing...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {painPoints.slice(0, 4).map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">And maybe also...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {painPoints.slice(4).map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-700 mb-8 font-medium">
              If this sounds like you, you're not broken. You're not weak. And you're definitely not alone.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Your nervous system is doing exactly what it was designed to do: keep you alive. But now it's time to teach it how to let you thrive.
            </p>
            <Link href="/assessment">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
                Take the Free Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solution - Phoenix Method */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Introducing the Phoenix Method™
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary 7-phase program that combines cutting-edge neuroscience with trauma-informed coaching to help you rise from the ashes of your past.
            </p>
          </div>

          <div className="grid gap-6">
            {phoenixPhases.map((phase, index) => (
              <Card key={phase.letter} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-xl">{phase.letter}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Phase {index + 1}: {phase.name}
                      </h3>
                      <p className="text-gray-600 text-lg">{phase.description}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center`}>
                      <phase.icon className="text-white" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/assessment">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
                Discover Your Current Phase
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Real Women, Real Transformations
            </h2>
            <p className="text-xl text-gray-600">
              See how the Phoenix Method™ has changed lives just like yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="w-fit">{testimonial.result}</Badge>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-700 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm text-gray-600">
                    <strong>{testimonial.name}</strong> - {testimonial.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Why the Phoenix Method™ Works When Everything Else Has Failed
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-800">Traditional Therapy Focuses On:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">Talking through problems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">Cognitive understanding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">Symptom management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">Long-term processing</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Phoenix Method™ Focuses On:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Nervous system regulation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Somatic healing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Root cause transformation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Rapid, lasting results</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-orange-100 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              The Science Behind the Phoenix Method™
            </h3>
            <p className="text-orange-700 text-lg">
              Our approach is based on the latest research in neuroscience, polyvagal theory, and trauma-informed care. 
              We work directly with your nervous system to create safety, then build resilience from the ground up.
            </p>
          </div>

          <Link href="/assessment">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3">
              Start Your Phoenix Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Your Phoenix is Ready to Rise
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stop waiting for "someday" to heal. Your transformation begins with a single step, 
            and that step is understanding exactly where you are right now.
          </p>
          
          <Card className="max-w-2xl mx-auto bg-white text-gray-900">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Take Your Free Phoenix Assessment</h3>
              <p className="text-gray-600 mb-6">
                In just 2 minutes, discover your current healing phase and get your personalized roadmap to transformation.
              </p>
              <Link href="/assessment">
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3">
                  Get My Free Assessment Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                ✨ Completely free • 📧 Instant results • 🔒 Privacy protected
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}