import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/hero";
import { PhaseCard } from "@/components/phase-card";
import { QuickToolModal } from "@/components/quick-tool-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, BookOpen, Heart, Calendar, TrendingUp, Award } from "lucide-react";
import { Link } from "wouter";
import type { Phase, UserProgress, User } from "@shared/schema";

export default function Home() {
  const [activeQuickTool, setActiveQuickTool] = useState<'grounding' | 'journal' | 'compassion' | null>(null);
  
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

  const achievements = [
    { title: "First Boundary Set", description: "You practiced saying no", icon: "🛡️", date: "2 days ago" },
    { title: "Week Streak", description: "7 days of daily check-ins", icon: "🔥", date: "Yesterday" },
    { title: "Self-Compassion", description: "Completed inner child work", icon: "💚", date: "3 days ago" },
  ];

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
            {phases.length > 0 ? (
              phases.sort((a, b) => a.order - b.order).map((phase) => {
                const progress = userProgress.find(p => p.phaseId === phase.id);
                return (
                  <PhaseCard key={phase.id} phase={phase} progress={progress} />
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Loading phases...</p>
              </div>
            )}
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
                <Button 
                  onClick={() => setActiveQuickTool('grounding')}
                  className="w-full bg-teal-50 hover:bg-teal-100 phoenix-text-accent py-3 rounded-lg font-medium transition-colors"
                >
                  <Leaf className="mr-2" size={16} />
                  5-Minute Grounding
                </Button>
                <Button 
                  onClick={() => setActiveQuickTool('journal')}
                  className="w-full bg-blue-50 hover:bg-blue-100 phoenix-text-primary py-3 rounded-lg font-medium transition-colors"
                >
                  <BookOpen className="mr-2" size={16} />
                  Quick Check-In
                </Button>
                <Button 
                  onClick={() => setActiveQuickTool('compassion')}
                  className="w-full bg-pink-50 hover:bg-pink-100 phoenix-text-secondary py-3 rounded-lg font-medium transition-colors"
                >
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
            
            {/* Recent Achievements */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="mr-2 phoenix-text-secondary" size={20} />
                Recent Wins
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <span className="text-xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                      <p className="text-xs phoenix-text-gray">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{achievement.date}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights & Growth */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Growth Journey</h2>
            <p className="text-lg phoenix-text-gray max-w-2xl mx-auto">
              Track your progress and celebrate the small victories that lead to lasting change
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Monthly Progress</h3>
                <TrendingUp className="phoenix-text-primary" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="phoenix-text-gray">Exercises Completed</span>
                  <span className="font-medium">23/30</span>
                </div>
                <Progress value={77} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="phoenix-text-gray">Boundaries Practiced</span>
                  <span className="font-medium">15</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Stress Levels</h3>
                <TrendingUp className="phoenix-text-success" size={20} />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold phoenix-text-success mb-2">6.2</div>
                <p className="text-sm phoenix-text-gray mb-3">Average this week</p>
                <div className="text-xs phoenix-text-success bg-green-100 px-2 py-1 rounded-full inline-block">
                  ↓ 2.1 points lower than last month
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Healing Streak</h3>
                <Calendar className="phoenix-text-secondary" size={20} />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold phoenix-text-secondary mb-2">12</div>
                <p className="text-sm phoenix-text-gray mb-3">Consecutive days</p>
                <p className="text-xs phoenix-text-secondary">
                  Keep going! Consistency builds resilience.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Daily Affirmation */}
      <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Affirmation</h2>
          <Card className="p-8 bg-white/80 backdrop-blur">
            <p className="text-xl phoenix-text-gray italic mb-4">
              "I am worthy of respect and healthy boundaries. I protect my energy with love and intention."
            </p>
            <p className="text-sm phoenix-text-gray">
              Take a moment to really feel these words. Let them settle into your heart.
            </p>
          </Card>
        </div>
      </section>

      <QuickToolModal 
        tool={activeQuickTool}
        isOpen={activeQuickTool !== null}
        onClose={() => setActiveQuickTool(null)}
      />

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
