import { Check, Play } from "lucide-react";
import type { Phase, UserProgress } from "@shared/schema";

interface ProgressTrackerProps {
  phases: Phase[];
  userProgress: UserProgress[];
}

export function ProgressTracker({ phases, userProgress }: ProgressTrackerProps) {
  const getPhaseProgress = (phaseId: number) => {
    return userProgress.find(p => p.phaseId === phaseId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="text-white text-sm" size={16} />;
      case 'in_progress':
        return <Play className="text-white text-sm" size={16} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'phoenix-bg-success';
      case 'in_progress':
        return 'phoenix-bg-primary';
      default:
        return 'bg-gray-200';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'phoenix-text-success';
      case 'in_progress':
        return 'phoenix-text-primary';
      default:
        return 'phoenix-text-gray';
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {phases.sort((a, b) => a.order - b.order).map((phase) => {
        const progress = getPhaseProgress(phase.id);
        const status = progress?.status || 'locked';
        
        return (
          <div key={phase.id} className="flex flex-col items-center">
            <div className={`w-10 h-10 ${getStatusColor(status)} rounded-full flex items-center justify-center mb-2`}>
              {getStatusIcon(status) || (
                <span className="phoenix-text-gray text-sm font-medium">{phase.letter}</span>
              )}
            </div>
            <span className={`text-xs font-medium ${getTextColor(status)}`}>{phase.letter}</span>
            <span className="text-xs phoenix-text-gray">{phase.name.split(' ')[0]}</span>
          </div>
        );
      })}
    </div>
  );
}
