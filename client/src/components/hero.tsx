import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ProgressTracker } from "./progress-tracker";
import type { User, UserProgress, Phase } from "@shared/schema";

export function Hero() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user/current'],
  });

  const { data: phases = [] } = useQuery<Phase[]>({
    queryKey: ['/api/phases'],
  });

  const { data: userProgress = [] } = useQuery<UserProgress[]>({
    queryKey: ['/api/user/progress'],
  });

  const completedPhases = userProgress.filter(p => p.status === 'completed').length;
  const totalPhases = phases.length;
  const progressPercentage = totalPhases > 0 ? (completedPhases / totalPhases) * 100 : 0;

  return (
    <section className="phoenix-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Journey to <span className="text-yellow-200">Healing</span> & <span className="text-pink-200">Rebirth</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            A trauma-informed coaching framework designed for emotionally exhausted women rising from trauma, anxiety, or narcissistic abuse.
          </p>
          
          {/* Progress Overview */}
          <Card className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
              <span className="phoenix-text-success text-sm font-medium">
                {completedPhases}/{totalPhases} phases complete
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="phoenix-gradient h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <ProgressTracker phases={phases} userProgress={userProgress} />
          </Card>
        </div>
      </div>
    </section>
  );
}
