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
          
          {/* Hero Image - Phoenix Rising */}
          <div className="mb-8 relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl mb-6">
              <div className="w-48 h-48 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                {/* Phoenix SVG */}
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C12 2 8 4 8 8C8 10 9 11 10 12C9 13 8 14 8 16C8 20 12 22 12 22C12 22 16 20 16 16C16 14 15 13 14 12C15 11 16 10 16 8C16 4 12 2 12 2ZM12 4.5C13.5 5.5 14 6.5 14 8C14 9 13.5 9.5 13 10L12 11L11 10C10.5 9.5 10 9 10 8C10 6.5 10.5 5.5 12 4.5ZM12 13L13 14C13.5 14.5 14 15 14 16C14 17.5 13 18.5 12 19.5C11 18.5 10 17.5 10 16C10 15 10.5 14.5 11 14L12 13Z"/>
                  {/* Wings */}
                  <path d="M6 10C6 10 4 8 2 10C2 12 4 14 6 12C6 12 8 10 8 8C8 8 6 10 6 10ZM18 10C18 10 20 8 22 10C22 12 20 14 18 12C18 12 16 10 16 8C16 8 18 10 18 10Z" opacity="0.8"/>
                  {/* Flame effects */}
                  <path d="M12 2C12 2 10 1 9 3C9 4 10 5 12 4C12 4 14 1 12 2ZM12 2C12 2 14 1 15 3C15 4 14 5 12 4C12 4 10 1 12 2Z" opacity="0.6"/>
                </svg>
              </div>
            </div>
            
            {/* Floating transformation elements around the hero Phoenix */}
            <div className="absolute top-4 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
              </svg>
            </div>
            <div className="absolute top-8 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <div className="absolute bottom-12 left-1/3 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2V13L10.5 9.5L14 13V2H7ZM16 2V11L18.5 8.5L21 11V2H16ZM5 14L12 21L19 14H16L12 18L8 14H5Z"/>
              </svg>
            </div>
            
            {/* Additional floating feathers/transformation symbols */}
            <div className="absolute top-16 left-12 w-8 h-8 opacity-60 animate-float">
              <svg className="w-full h-full text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13 3 14 5 14 8C14 11 13 13 12 14C11 13 10 11 10 8C10 5 11 3 12 2ZM8 6C9 7 10 9 10 12C10 15 9 17 8 18C7 17 6 15 6 12C6 9 7 7 8 6ZM16 6C17 7 18 9 18 12C18 15 17 17 16 18C15 17 14 15 14 12C14 9 15 7 16 6Z" opacity="0.7"/>
              </svg>
            </div>
            <div className="absolute bottom-8 right-16 w-6 h-6 opacity-50 animate-float delay-500">
              <svg className="w-full h-full text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13 3 14 5 14 8C14 11 13 13 12 14C11 13 10 11 10 8C10 5 11 3 12 2Z" opacity="0.8"/>
              </svg>
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
            {/* Emotional Pain Imagery */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-400 to-gray-600 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                  {/* Wounded bird/broken phoenix */}
                  <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22C12 22 8 20 8 16C8 14 9 13 10 12C9 11 8 10 8 8C8 6 10 4 12 4C12 4 10 6 10 8C10 9 10.5 9.5 11 10L12 11L13 10C13.5 9.5 14 9 14 8C14 6 12 4 12 4C14 4 16 6 16 8C16 10 15 11 14 12C15 13 16 14 16 16C16 20 12 22 12 22Z" opacity="0.7"/>
                    {/* Broken wing */}
                    <path d="M6 10C6 10 4 8 2 10C2 12 4 14 6 12" opacity="0.4"/>
                    {/* Tears/pain */}
                    <circle cx="10" cy="9" r="1" fill="white" opacity="0.8"/>
                    <circle cx="14" cy="9" r="1" fill="white" opacity="0.8"/>
                  </svg>
                </div>
                {/* Broken chain links around */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-4 border-gray-400 rounded-full transform rotate-45 opacity-60"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-4 border-gray-500 rounded-full transform -rotate-45 opacity-60"></div>
                {/* Storm clouds */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute -top-4 left-2 w-8 h-4 bg-gray-500 rounded-full opacity-30"></div>
                  <div className="absolute -top-2 right-4 w-6 h-3 bg-gray-600 rounded-full opacity-40"></div>
                </div>
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
              {/* Healing/Hope imagery - Butterfly transformation */}
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  {/* Butterfly representing transformation */}
                  <path d="M12 2C12 2 10 4 8 6C6 8 4 10 4 12C4 14 6 16 8 18C10 20 12 22 12 22C12 22 14 20 16 18C18 16 20 14 20 12C20 10 18 8 16 6C14 4 12 2 12 2Z"/>
                  {/* Butterfly wings */}
                  <path d="M6 8C6 8 4 6 2 8C2 10 4 12 6 10C6 10 7 9 8 8M18 8C18 8 20 6 22 8C22 10 20 12 18 10C18 10 17 9 16 8" opacity="0.8"/>
                  <path d="M6 16C6 16 4 18 2 16C2 14 4 12 6 14C6 14 7 15 8 16M18 16C18 16 20 18 22 16C22 14 20 12 18 14C18 14 17 15 16 16" opacity="0.8"/>
                  {/* Body */}
                  <path d="M12 6L12 18" stroke="white" strokeWidth="1" opacity="0.9"/>
                </svg>
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
        {/* Phoenix Rising imagery - Background elements */}
        <div className="absolute top-10 right-10 opacity-15">
          <svg className="w-64 h-64 text-orange-300" fill="currentColor" viewBox="0 0 100 100">
            {/* Large phoenix silhouette */}
            <path d="M50 10C50 10 30 20 30 40C30 50 35 55 40 60C35 65 30 70 30 80C30 100 50 110 50 110C50 110 70 100 70 80C70 70 65 65 60 60C65 55 70 50 70 40C70 20 50 10 50 10Z" opacity="0.6"/>
            <path d="M20 35C20 35 10 25 5 35C5 50 20 60 35 50C40 47 45 42 45 40M80 35C80 35 90 25 95 35C95 50 80 60 65 50C60 47 55 42 55 40" opacity="0.5"/>
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-12">
          <svg className="w-48 h-48 text-purple-300" fill="currentColor" viewBox="0 0 100 100">
            {/* Transformation spiral */}
            <path d="M50 20C60 20 70 30 70 40C70 50 60 60 50 60C40 60 30 50 30 40C30 30 40 20 50 20ZM50 25C55 25 60 30 60 35C60 40 55 45 50 45C45 45 40 40 40 35C40 30 45 25 50 25ZM50 30C52 30 55 32 55 35C55 38 52 40 50 40C48 40 45 38 45 35C45 32 48 30 50 30Z" opacity="0.4"/>
            {/* Radiating energy lines */}
            <path d="M50 10L50 20M50 80L50 90M10 50L20 50M80 50L90 50M20 20L25 25M75 75L80 80M80 20L75 25M25 75L20 80" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Phoenix Rising Symbol */}
            <div className="mb-8">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-300 to-red-400 rounded-full flex items-center justify-center">
                  {/* Detailed Phoenix Rising */}
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* Phoenix body */}
                    <path d="M12 2C12 2 8 4 8 8C8 10 9 11 10 12C9 13 8 14 8 16C8 20 12 22 12 22C12 22 16 20 16 16C16 14 15 13 14 12C15 11 16 10 16 8C16 4 12 2 12 2Z"/>
                    {/* Phoenix wings spread wide */}
                    <path d="M6 8C6 8 3 6 1 8C1 11 4 13 7 11C8 10.5 8 9 8 8M18 8C18 8 21 6 23 8C23 11 20 13 17 11C16 10.5 16 9 16 8" opacity="0.9"/>
                    {/* Phoenix tail feathers */}
                    <path d="M12 22C12 22 10 24 8 22C10 20 12 22 12 22M12 22C12 22 14 24 16 22C14 20 12 22 12 22" opacity="0.8"/>
                    {/* Phoenix head crest */}
                    <path d="M12 2C12 2 10 0 8 2C10 4 12 2 12 2M12 2C12 2 14 0 16 2C14 4 12 2 12 2" opacity="0.7"/>
                  </svg>
                </div>
                {/* Flying sparks/flames representing rebirth */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-3 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="absolute top-4 -left-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="absolute -top-3 left-6 w-3 h-3 bg-yellow-300 rounded-full animate-ping delay-500"></div>
                <div className="absolute bottom-2 -right-3 w-2 h-6 bg-orange-300 rounded-full animate-pulse delay-700"></div>
                {/* Ashes transforming to flames */}
                <div className="absolute bottom-8 left-4 w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                <div className="absolute bottom-10 right-6 w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-400"></div>
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
            {/* Success/transformation imagery - Rising Sun */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-300 to-blue-400 rounded-full flex items-center justify-center">
                  {/* Rising sun with rays representing new dawn/transformation */}
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* Sun center */}
                    <circle cx="12" cy="12" r="4" />
                    {/* Sun rays */}
                    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
                    {/* Additional rays for more radiance */}
                    <path d="M8.46 2.54L9.17 4.46M14.83 19.54L15.54 21.46M2.54 8.46L4.46 9.17M19.54 14.83L21.46 15.54M2.54 15.54L4.46 14.83M19.54 9.17L21.46 8.46M8.46 21.46L9.17 19.54M14.83 4.46L15.54 2.54" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
                  </svg>
                </div>
                {/* Success sparkles - representing light */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                <div className="absolute top-3 -left-4 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
                <div className="absolute -top-3 left-4 w-3 h-3 bg-yellow-300 rounded-full animate-ping delay-700"></div>
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
          {/* Phoenix rising symbol - Final CTA */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-red-400 rounded-full flex items-center justify-center">
                {/* Triumphant Phoenix */}
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  {/* Phoenix body - fully formed */}
                  <path d="M12 2C12 2 8 4 8 8C8 10 9 11 10 12C9 13 8 14 8 16C8 20 12 22 12 22C12 22 16 20 16 16C16 14 15 13 14 12C15 11 16 10 16 8C16 4 12 2 12 2Z"/>
                  {/* Majestic wings fully spread */}
                  <path d="M5 7C5 7 2 5 0 7C0 10 3 12 6 10C7 9.5 8 8.5 8 8M19 7C19 7 22 5 24 7C24 10 21 12 18 10C17 9.5 16 8.5 16 8" opacity="0.95"/>
                  {/* Crown/crest representing mastery */}
                  <path d="M12 2C12 2 10 0 8 1C9 2 11 2 12 2M12 2C12 2 14 0 16 1C15 2 13 2 12 2M12 2C12 2 11 -1 12 0C13 -1 12 2 12 2" opacity="0.8"/>
                  {/* Powerful tail representing strength */}
                  <path d="M12 22C12 22 9 24 7 22C9 20 11 21 12 22M12 22C12 22 15 24 17 22C15 20 13 21 12 22M12 22C12 22 12 25 12 23" opacity="0.9"/>
                </svg>
              </div>
              {/* Victory flames - more dynamic */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-300 rounded-full animate-bounce"></div>
              <div className="absolute top-2 -left-4 w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute -top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-700"></div>
              <div className="absolute bottom-1 -right-4 w-3 h-3 bg-orange-200 rounded-full animate-bounce delay-500"></div>
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