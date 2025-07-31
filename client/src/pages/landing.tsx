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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 via-orange-50 to-red-100">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 shadow-lg">
            🔥 The Phoenix Method™ - As Seen in Psychology Today
          </Badge>
          
          {/* Hero Image */}
          <div className="mb-8 relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl mb-6">
              <div className="w-48 h-48 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C13.66 8 15 9.34 15 11V13H17C18.66 13 20 14.34 20 16V20C20 21.66 18.66 23 17 23H7C5.34 23 4 21.66 4 20V16C4 14.34 5.34 13 7 13H9V11C9 9.34 10.34 8 12 8ZM12 10C11.45 10 11 10.45 11 11V15H13V11C13 10.45 12.55 10 12 10Z"/>
                </svg>
              </div>
            </div>
            
            {/* Floating elements around the hero image */}
            <div className="absolute top-4 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Heart className="text-white" size={24} />
            </div>
            <div className="absolute top-8 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Star className="text-white" size={16} />
            </div>
            <div className="absolute bottom-12 left-1/3 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
              <Zap className="text-white" size={20} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Trauma Into Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600"> Greatest Strength</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 font-medium">
            The only neuroscience-backed 7-phase program designed specifically for emotionally exhausted women rising from trauma, anxiety, and narcissistic abuse.
          </p>

          {/* Lead Capture CTA */}
          <Card className="max-w-2xl mx-auto mb-12 border-2 border-gradient-to-r from-orange-400 to-pink-400 shadow-2xl bg-gradient-to-br from-white to-orange-50">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-t-lg">
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                🎁 Take Your Free Phoenix Assessment
              </CardTitle>
              <p className="text-gray-700 text-center font-medium">
                Discover exactly where you are in your healing journey and get your personalized transformation roadmap in just 2 minutes.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLeadCapture} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-lg border-2 border-orange-200 focus:border-orange-400"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-12 px-8 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-lg font-semibold shadow-lg"
                >
                  {isSubmitting ? "Starting..." : "Get My Free Assessment"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <p className="text-sm text-gray-600 mt-4 text-center font-medium">
                ✨ Free assessment • 📧 Instant access • 🔒 No spam, ever
              </p>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {heroStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg border border-orange-200">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Pain Points Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 relative">
        {/* Background image representation */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-600 relative">
            {/* Subtle storm/dark clouds pattern */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Emotional imagery */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-400 to-gray-600 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full opacity-70"></div>
                  <div className="w-2 h-8 bg-white/30 absolute top-8"></div>
                </div>
                {/* Broken chain links around */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-4 border-gray-400 rounded-full transform rotate-45"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-4 border-gray-500 rounded-full transform -rotate-45"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent mb-6">
              Are You Tired of Living in Survival Mode?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              If you're reading this, chances are you're struggling with the invisible wounds that keep you stuck, anxious, and emotionally exhausted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-red-300 bg-gradient-to-br from-red-50 to-pink-50 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100">
                <CardTitle className="text-red-800 flex items-center">
                  <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  You might be experiencing...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {painPoints.slice(0, 4).map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-white/50">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800 font-medium">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-100 to-orange-100">
                <CardTitle className="text-red-800 flex items-center">
                  <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  And maybe also...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {painPoints.slice(4).map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-white/50">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800 font-medium">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-orange-200">
            <div className="mb-6">
              {/* Healing/Hope imagery */}
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                <Heart className="text-white w-12 h-12" />
              </div>
            </div>
            
            <p className="text-xl text-gray-800 mb-8 font-bold">
              If this sounds like you, you're not broken. You're not weak. And you're definitely not alone.
            </p>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              Your nervous system is doing exactly what it was designed to do: keep you alive. But now it's time to teach it how to let you thrive.
            </p>
            <Link href="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-lg px-8 py-3 shadow-lg">
                Take the Free Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solution - Phoenix Method */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 relative">
        {/* Phoenix Rising imagery */}
        <div className="absolute top-10 right-10 opacity-20">
          <div className="w-64 h-64 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <div className="w-48 h-48 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Phoenix Rising Symbol */}
            <div className="mb-8">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-300 to-red-400 rounded-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z"/>
                  </svg>
                </div>
                {/* Flying sparks/flames */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-3 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="absolute top-4 -left-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Introducing the Phoenix Method™
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              A revolutionary 7-phase program that combines cutting-edge neuroscience with trauma-informed coaching to help you rise from the ashes of your past.
            </p>
          </div>

          <div className="grid gap-6">
            {phoenixPhases.map((phase, index) => (
              <Card key={phase.letter} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-orange-200 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center flex-shrink-0 shadow-lg relative`}>
                      <span className="text-white font-bold text-2xl">{phase.letter}</span>
                      {/* Glowing effect */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} opacity-20 animate-pulse`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        Phase {index + 1}: {phase.name}
                      </h3>
                      <p className="text-gray-700 text-lg font-medium">{phase.description}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center shadow-lg`}>
                      <phase.icon className="text-white" size={28} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-orange-200 max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="text-white w-8 h-8" />
                </div>
              </div>
              <Link href="/assessment">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-lg px-8 py-3 shadow-lg w-full">
                  Discover Your Current Phase
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
        {/* Success imagery background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Success/transformation imagery */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-300 to-blue-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white w-12 h-12" />
                </div>
                {/* Success sparkles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Real Women, Real Transformations
            </h2>
            <p className="text-xl text-gray-700 font-medium">
              See how the Phoenix Method™ has changed lives just like yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-transparent hover:border-green-200 transition-all duration-300 hover:scale-105">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="w-fit bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200">
                    {testimonial.result}
                  </Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <blockquote className="text-gray-800 mb-4 font-medium italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm text-gray-700 font-medium">
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
      <section className="py-20 px-4 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600 text-white relative overflow-hidden">
        {/* Rising phoenix background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Phoenix rising symbol */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-red-400 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z"/>
                </svg>
              </div>
              {/* Animated flame effects */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-300 rounded-full animate-bounce"></div>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
            Your Phoenix is Ready to Rise
          </h2>
          <p className="text-xl mb-8 opacity-95 font-medium">
            Stop waiting for "someday" to heal. Your transformation begins with a single step, 
            and that step is understanding exactly where you are right now.
          </p>
          
          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm text-gray-900 shadow-2xl border-2 border-white/20">
            <CardContent className="p-8">
              <div className="mb-6">  
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="text-white w-8 h-8" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Take Your Free Phoenix Assessment
              </h3>
              <p className="text-gray-700 mb-6 font-medium">
                In just 2 minutes, discover your current healing phase and get your personalized roadmap to transformation.
              </p>
              <Link href="/assessment">
                <Button size="lg" className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-lg py-3 shadow-lg">
                  Get My Free Assessment Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-4 font-medium">
                ✨ Completely free • 📧 Instant results • 🔒 Privacy protected
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}