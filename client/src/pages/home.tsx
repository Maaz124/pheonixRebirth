import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/hero";
import { PhaseCard } from "@/components/phase-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Leaf, BookOpen, Heart } from "lucide-react";
import { Link } from "wouter";
import type { Phase, UserProgress, User } from "@shared/schema";

export default function Home() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user/current'],
  });

  const { data: phases = [] } = useQuery<Phase[]>({
    queryKey: ['/api/phases'],
  });

  const { data: userProgress = [] } = useQuery<UserProgress[]>({
    queryKey: ['/api/user/progress'],
  });

  const currentPhase = phases.find(p => p.order === user?.currentPhase);
  const currentProgress = userProgress.find(p => p.phaseId === currentPhase?.id);

  const weeklyProgress = {
    boundaryExercises: { completed: 2, total: 7 },
    journalEntries: { completed: 5, total: 7 },
    mindfulnessPractice: { completed: 3, total: 7 },
  };

  return (
    <main>
      <Hero />
      
      {/* Current Phase Focus */}
      {currentPhase && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="phoenix-gradient rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">{currentPhase.letter}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Phase {currentPhase.order}: {currentPhase.name}</h3>
                  <p className="text-white/90">{currentPhase.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Today's Focus</h4>
                  <p className="text-sm text-white/90">Understanding healthy boundaries and identifying your boundary patterns</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">This Week's Goal</h4>
                  <p className="text-sm text-white/90">Practice saying no in low-stakes situations and journal your experiences</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">Phase Milestone</h4>
                  <p className="text-sm text-white/90">Establish 3 clear boundaries and communicate them confidently</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PHOENIX Method Overview */}
      <section className="py-16 phoenix-bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The PHOENIX Method™</h2>
            <p className="text-lg phoenix-text-gray max-w-2xl mx-auto">Seven transformative phases designed to guide you from burnout to rebirth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {phases.sort((a, b) => a.order - b.order).map((phase) => {
              const progress = userProgress.find(p => p.phaseId === phase.id);
              return (
                <PhaseCard key={phase.id} phase={phase} progress={progress} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Today's Tools & Progress */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Tools */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tools</h3>
              <div className="space-y-3">
                <Button className="w-full bg-teal-50 hover:bg-teal-100 phoenix-text-accent py-3 rounded-lg font-medium transition-colors">
                  <Leaf className="mr-2" size={16} />
                  5-Minute Grounding
                </Button>
                <Link href="/journal">
                  <Button className="w-full bg-blue-50 hover:bg-blue-100 phoenix-text-primary py-3 rounded-lg font-medium transition-colors">
                    <BookOpen className="mr-2" size={16} />
                    Boundary Journal
                  </Button>
                </Link>
                <Button className="w-full bg-pink-50 hover:bg-pink-100 phoenix-text-secondary py-3 rounded-lg font-medium transition-colors">
                  <Heart className="mr-2" size={16} />
                  Self-Compassion Break
                </Button>
              </div>
            </div>
            
            {/* Progress Tracking */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm phoenix-text-gray">Boundary exercises</span>
                    <span className="text-sm font-medium phoenix-text-success">
                      {weeklyProgress.boundaryExercises.completed}/{weeklyProgress.boundaryExercises.total}
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.boundaryExercises.completed / weeklyProgress.boundaryExercises.total) * 100}
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm phoenix-text-gray">Journal entries</span>
                    <span className="text-sm font-medium phoenix-text-success">
                      {weeklyProgress.journalEntries.completed}/{weeklyProgress.journalEntries.total}
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.journalEntries.completed / weeklyProgress.journalEntries.total) * 100}
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm phoenix-text-gray">Mindfulness practice</span>
                    <span className="text-sm font-medium phoenix-text-success">
                      {weeklyProgress.mindfulnessPractice.completed}/{weeklyProgress.mindfulnessPractice.total}
                    </span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.mindfulnessPractice.completed / weeklyProgress.mindfulnessPractice.total) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </div>
            
            {/* Affirmation */}
            <div className="bg-gradient-to-br from-pink-50 to-teal-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Today's Affirmation</h3>
              <p className="phoenix-text-gray italic text-center">
                "I am worthy of respect and healthy boundaries. I protect my energy with love and intention."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 phoenix-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🔥</span>
                </div>
                <h3 className="text-lg font-bold">PHOENIX Method™</h3>
              </div>
              <p className="text-gray-400 text-sm">Transforming lives through trauma-informed coaching and evidence-based healing practices.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crisis Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Coach</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Privacy</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Emergency Support</h4>
              <div className="text-sm text-gray-400">
                <p className="mb-2">If you're in crisis, please reach out:</p>
                <p className="phoenix-text-secondary">Crisis Text Line: Text HOME to 741741</p>
                <p className="phoenix-text-secondary">National Suicide Prevention Lifeline: 988</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 PHOENIX Method™. All rights reserved. Licensed coaching program.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
