import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Assessment } from "@/components/assessment";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import type { Phase, UserProgress, Exercise } from "@shared/schema";
import type { AssessmentQuestion, AssessmentResponse } from "@/lib/types";

export default function PhasePage() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const phaseIdNum = parseInt(phaseId || "0");

  const { data: phase } = useQuery<Phase>({
    queryKey: ['/api/phases', phaseIdNum],
    enabled: !!phaseIdNum,
  });

  const { data: progress } = useQuery<UserProgress>({
    queryKey: ['/api/user/progress', phaseIdNum],
    enabled: !!phaseIdNum,
  });

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['/api/phases', phaseIdNum, 'exercises'],
    enabled: !!phaseIdNum,
  });

  const handleAssessmentSubmit = (responses: AssessmentResponse[]) => {
    console.log('Assessment responses:', responses);
    // TODO: Submit to API
  };

  // Sample assessment questions for boundaries phase
  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: "boundary1",
      question: "When someone asks you to do something you don't want to do, what's your typical response?",
      type: "radio",
      options: [
        "I usually say yes even when I don't want to",
        "I feel guilty but sometimes say no",
        "I can say no without feeling guilty"
      ]
    },
    {
      id: "boundary2",
      question: "How do you feel when someone is upset with you?",
      type: "radio",
      options: [
        "I feel responsible and need to fix it immediately",
        "I feel uncomfortable but can manage it",
        "I understand it's their emotion to process"
      ]
    }
  ];

  if (!phase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Phase not found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="phoenix-text-gray hover:phoenix-text-primary">
              <ArrowLeft className="mr-2" size={16} />
              Back to Overview
            </Button>
          </Link>
        </div>

        {/* Phase Header */}
        <div className="phoenix-gradient rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">{phase.letter}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Phase {phase.order}: {phase.name}</h1>
              <p className="text-xl text-white/90">{phase.description}</p>
            </div>
          </div>
          
          {progress && (
            <div className="bg-white/10 rounded-lg p-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Progress</span>
                <span className="text-sm">
                  {progress.exercisesCompleted} of {progress.totalExercises} exercises completed
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(progress.exercisesCompleted / progress.totalExercises) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Today's Learning */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Learning: Understanding Healthy Boundaries</h2>
              <p className="phoenix-text-gray mb-6">
                Boundaries are not walls to keep people out, but guidelines that help you maintain your emotional well-being while building healthy relationships.
              </p>
              
              <Card className="bg-white rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Concepts</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 phoenix-bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Physical Boundaries</h4>
                      <p className="text-sm phoenix-text-gray">Personal space, touch, and physical comfort levels</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 phoenix-bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Emotional Boundaries</h4>
                      <p className="text-sm phoenix-text-gray">Protecting your emotional energy and well-being</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 phoenix-bg-accent rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Time Boundaries</h4>
                      <p className="text-sm phoenix-text-gray">Managing your time and availability</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="text-yellow-600" size={20} />
                  <h4 className="font-medium text-yellow-800">Trauma-Informed Insight</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  For trauma survivors, boundaries may feel foreign or dangerous. This is a normal response. Take your time and practice self-compassion.
                </p>
              </div>
            </div>
            
            {/* Self-Assessment */}
            <Assessment
              title="Self-Assessment: Your Boundary Patterns"
              description="Understanding your current boundary patterns is the first step toward creating healthier relationships."
              questions={assessmentQuestions}
              onSubmit={handleAssessmentSubmit}
            />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Phase Navigation */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phase Navigation</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start phoenix-text-primary">
                  📖 Understanding Boundaries
                </Button>
                <Button variant="ghost" className="w-full justify-start phoenix-text-gray">
                  🎯 Setting Personal Limits
                </Button>
                <Button variant="ghost" className="w-full justify-start phoenix-text-gray">
                  💬 Communicating Boundaries
                </Button>
                <Button variant="ghost" className="w-full justify-start phoenix-text-gray">
                  🛡️ Maintaining Boundaries
                </Button>
              </div>
            </Card>

            {/* Quick Resources */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Resources</h3>
              <div className="space-y-3">
                <Link href="/resources">
                  <Button variant="outline" className="w-full">
                    📋 Boundary Worksheet
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  🎧 Guided Meditation
                </Button>
                <Button variant="outline" className="w-full">
                  📱 Practice Scripts
                </Button>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-teal-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Support?</h3>
              <p className="text-sm phoenix-text-gray mb-4">
                Remember, healing isn't linear. Be gentle with yourself as you practice new skills.
              </p>
              <Button variant="outline" className="w-full">
                💬 Contact Coach
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
