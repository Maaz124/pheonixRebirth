import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

const pricingTiers = [
  {
    id: "free",
    name: "Phoenix Spark",
    price: 0,
    period: "Forever Free",
    description: "Begin your healing journey with essential tools",
    icon: Heart,
    color: "from-gray-400 to-gray-600",
    features: [
      "Access to Phase 1: Pause the Panic",
      "Basic journaling tools",
      "Community support forum",
      "Weekly check-in emails",
      "Progress tracking"
    ],
    limitations: [
      "Limited to first phase only",
      "Basic support only"
    ]
  },
  {
    id: "essential",
    name: "Phoenix Rise",
    price: 29,
    period: "per month",
    description: "Complete access to the 7-phase recovery program",
    icon: Star,
    color: "from-orange-400 to-red-500",
    popular: true,
    features: [
      "Full access to all 7 P.H.O.E.N.I.X phases",
      "Interactive exercises and assessments",
      "Advanced journaling with mood tracking",
      "Personalized recovery dashboard",
      "Email support within 24 hours",
      "Downloadable resources library",
      "Progress analytics and insights",
      "Mobile app access"
    ],
    limitations: []
  },
  {
    id: "premium",
    name: "Phoenix Transform",
    price: 79,
    period: "per month",
    description: "Everything in Rise plus premium coaching support",
    icon: Crown,
    color: "from-purple-500 to-indigo-600",
    features: [
      "Everything in Phoenix Rise",
      "Monthly 1-on-1 coaching call (60 min)",
      "Priority email support (same day)",
      "Custom recovery plan creation",
      "Access to live group sessions",
      "Advanced trauma-informed tools",
      "Personalized affirmations library",
      "Family/partner resources access"
    ],
    limitations: []
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user/current'],
  });

  const handleSubscribe = (tierId: string) => {
    if (tierId === 'free') {
      // Handle free tier signup or redirect to registration
      return;
    }
    
    // Redirect to subscription page with selected tier
    window.location.href = `/subscribe?tier=${tierId}&billing=${isAnnual ? 'annual' : 'monthly'}`;
  };

  const getDiscountedPrice = (price: number) => {
    return isAnnual ? Math.round(price * 10) : price; // 2 months free annually
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Phoenix Method™ Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your trauma into your greatest strength with our scientifically-backed, 
            trauma-informed recovery program designed specifically for women.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Save 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => {
            const IconComponent = tier.icon;
            const finalPrice = tier.price > 0 ? getDiscountedPrice(tier.price) : 0;
            
            return (
              <Card key={tier.id} className={`relative overflow-hidden ${
                tier.popular ? 'ring-2 ring-orange-500 scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {tier.description}
                  </CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${finalPrice}
                      </span>
                      {tier.price > 0 && (
                        <span className="text-gray-600 ml-2">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {tier.price === 0 && (
                      <p className="text-sm text-gray-500 mt-1">{tier.period}</p>
                    )}
                    {isAnnual && tier.price > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(tier.price * 12) - finalPrice} annually
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => handleSubscribe(tier.id)}
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    disabled={user?.subscriptionTier === tier.id}
                  >
                    {user?.subscriptionTier === tier.id 
                      ? 'Current Plan' 
                      : tier.price === 0 
                        ? 'Get Started Free' 
                        : 'Start Recovery Journey'
                    }
                  </Button>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">What's included:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust & Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your Healing Journey is Secure & Private
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="text-green-600" size={20} />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">HIPAA Compliant</h4>
                <p className="text-sm text-gray-600">Your personal information and progress are protected with medical-grade security.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="text-blue-600" size={20} />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">30-Day Guarantee</h4>
                <p className="text-sm text-gray-600">Not seeing progress? Get a full refund within 30 days, no questions asked.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="text-purple-600" size={20} />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Cancel Anytime</h4>
                <p className="text-sm text-gray-600">No long-term commitments. Pause or cancel your subscription whenever you need.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-medium text-gray-900 mb-2">How long does the Phoenix Method™ take?</h4>
              <p className="text-gray-600">The program is designed to be completed at your own pace. Most women see significant improvements within 8-12 weeks, but lasting transformation can take 6-12 months depending on your starting point and commitment level.</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-medium text-gray-900 mb-2">Is this therapy or coaching?</h4>
              <p className="text-gray-600">The Phoenix Method™ is a trauma-informed coaching program, not therapy. While our approach is based on therapeutic principles, we recommend working with a licensed therapist for severe trauma or mental health conditions.</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-medium text-gray-900 mb-2">Can I switch plans later?</h4>
              <p className="text-gray-600">Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle, and we'll prorate any differences.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-4">
            Ready to transform your trauma into your greatest strength?
          </p>
          <Link href="/">
            <Button variant="outline" size="lg">
              Learn More About the Method
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}