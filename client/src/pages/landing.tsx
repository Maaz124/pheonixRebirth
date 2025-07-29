import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Heart, Shield, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Trauma Survivor",
    content: "The Phoenix Method™ gave me my life back. After years of anxiety and panic attacks, I finally feel like myself again. The 7-phase program is exactly what I needed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
  },
  {
    name: "Jessica T.",
    role: "Narcissistic Abuse Survivor",
    content: "I wish I had found this program sooner. The boundary-setting exercises in Phase 4 literally changed my relationships. I'm finally free from toxic patterns.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  },
  {
    name: "Maria L.",
    role: "Working Mom",
    content: "As a busy mom dealing with childhood trauma, this program fit perfectly into my life. The interactive tools helped me process emotions I'd buried for decades.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=64&h=64&fit=crop&crop=face"
  }
];

const stats = [
  { number: "10,000+", label: "Women Transformed" },
  { number: "94%", label: "Completion Rate" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "30 Days", label: "Money-Back Guarantee" }
];

const benefits = [
  {
    icon: Heart,
    title: "Heal Trauma at the Root",
    description: "Address the neurological impact of trauma with science-backed techniques that rewire your brain for healing."
  },
  {
    icon: Shield,
    title: "Build Unshakeable Boundaries",
    description: "Learn to say no without guilt and protect your energy from toxic people and situations."
  },
  {
    icon: Users,
    title: "Transform Relationships",
    description: "Break free from codependent patterns and create healthy, fulfilling connections with others."
  },
  {
    icon: Clock,
    title: "Reclaim Your Time & Energy",
    description: "Stop living in survival mode and start thriving with sustainable self-care practices."
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
        leadMagnet: "free_assessment"
      });
      
      toast({
        title: "Success! Check your email",
        description: "Your free Phoenix Assessment is on its way. Check your inbox in the next few minutes.",
      });
      
      setEmail("");
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
            🔥 Trusted by 10,000+ Women Worldwide
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Trauma</span> Into Your Greatest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Strength</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            The Phoenix Method™ is a revolutionary 7-phase program designed specifically for emotionally exhausted women ready to rise from trauma, anxiety, and narcissistic abuse using cutting-edge neuroscience.
          </p>

          {/* Lead Capture Form */}
          <Card className="max-w-2xl mx-auto mb-12 border-2 border-orange-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">
                🎁 Get Your FREE Phoenix Assessment
              </CardTitle>
              <CardDescription className="text-lg">
                Discover exactly where you are in your healing journey and unlock your personalized transformation roadmap
              </CardDescription>
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
                  {isSubmitting ? "Sending..." : "Get Free Assessment"}
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
            {stats.map((stat, index) => (
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
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Constant anxiety and panic attacks that come out of nowhere</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Feeling emotionally numb or overwhelmed by intense emotions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Difficulty setting boundaries and saying no to toxic people</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Perfectionism and self-criticism that never lets up</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Feeling stuck in toxic relationship patterns</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Imagine instead...</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Waking up feeling calm, centered, and in control of your emotions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Having unshakeable boundaries that protect your peace</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Attracting healthy, supportive relationships into your life</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Feeling confident, worthy, and excited about your future</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <p className="text-gray-700">Using your trauma as fuel for helping others heal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution - Phoenix Method */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Introducing The Phoenix Method™
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A scientifically-backed, trauma-informed program that rewires your nervous system for lasting healing and transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* P.H.O.E.N.I.X Framework */}
          <Card className="mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">The P.H.O.E.N.I.X Framework</CardTitle>
              <CardDescription className="text-lg">
                Seven evidence-based phases designed to guide you from survival to thriving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { letter: "P", phase: "Pause the Panic", desc: "Master your nervous system" },
                  { letter: "H", phase: "Honor Your Humanity", desc: "Practice radical self-compassion" },
                  { letter: "O", phase: "Observe Your Patterns", desc: "Identify limiting beliefs" },
                  { letter: "E", phase: "Establish Boundaries", desc: "Protect your energy" },
                  { letter: "N", phase: "Nurture Your Nervous System", desc: "Build emotional resilience" },
                  { letter: "I", phase: "Integrate Your Growth", desc: "Embody your transformation" },
                  { letter: "X", phase: "eXamine Your Purpose", desc: "Share your gifts with the world" },
                ].map((phase, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{phase.letter}</div>
                    <div className="font-semibold mb-2">{phase.phase}</div>
                    <div className="text-sm text-gray-600">{phase.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              Join thousands of women who have reclaimed their power with The Phoenix Method™
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Your Transformation Starts Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't spend another day living in survival mode. Your future self is waiting for you to take this step.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-orange-600 hover:bg-gray-100 text-lg font-semibold">
                Start Your Journey Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#" className="text-white hover:text-gray-200 underline">
              Learn more about the method
            </Link>
          </div>
          
          <p className="text-sm mt-6 opacity-75">
            ✅ 30-day money-back guarantee • ✅ HIPAA compliant • ✅ Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}