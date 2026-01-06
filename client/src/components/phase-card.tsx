import { Check, Play, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Phase, UserProgress } from "@shared/schema";

interface PhaseCardProps {
  phase: Phase;
  progress?: UserProgress;
  isSubscribed?: boolean;
}

export function PhaseCard({ phase, progress, isSubscribed }: PhaseCardProps) {
  // Phase 1 is always unlocked.
  // Other phases are locked if not subscribed, regardless of progress or isLocked flag.
  const isPhaseUnlocked = phase.id === 1 || (!!isSubscribed && (!phase.isLocked || !!progress));

  const getStatusIcon = () => {
    // If securely locked due to subscription
    if (!isPhaseUnlocked) {
      return <Lock className="text-white text-sm" size={16} />;
    }

    if (!progress) {
      return phase.isLocked && phase.id !== 1 ? (
        <Lock className="text-white text-sm" size={16} />
      ) : (
        <Play className="text-white text-sm" size={16} />
      );
    }

    switch (progress.status) {
      case 'completed':
        return <Check className="text-white text-sm" size={16} />;
      case 'in_progress':
        return <Play className="text-white text-sm" size={16} />;
      default:
        return <span className="text-white text-sm font-medium">{phase.letter}</span>;
    }
  };

  const getStatusColor = () => {
    if (!isPhaseUnlocked) {
      return 'bg-gray-200';
    }

    if (!progress) {
      return phase.isLocked && phase.id !== 1 ? 'bg-gray-200' : 'phoenix-bg-primary';
    }

    switch (progress.status) {
      case 'completed':
        return 'phoenix-bg-success';
      case 'in_progress':
        return 'phoenix-bg-primary';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusText = () => {
    if (!isPhaseUnlocked) {
      return '🔒 Locked';
    }

    if (!progress) {
      return phase.isLocked && phase.id !== 1 ? '🔒 Locked' : '✨ Ready to Start';
    }

    switch (progress.status) {
      case 'completed':
        return '✓ Completed';
      case 'in_progress':
        return '🔄 In Progress';
      default:
        return '⏳ Upcoming';
    }
  };

  const getStatusTextColor = () => {
    if (!isPhaseUnlocked) {
      return 'phoenix-text-gray';
    }

    if (!progress) {
      return phase.isLocked && phase.id !== 1 ? 'phoenix-text-gray' : 'phoenix-text-primary';
    }

    switch (progress.status) {
      case 'completed':
        return 'phoenix-text-success';
      case 'in_progress':
        return 'phoenix-text-primary';
      default:
        return 'phoenix-text-gray';
    }
  };

  const getBorderColor = () => {
    if (!isPhaseUnlocked) {
      return 'border-gray-200';
    }

    if (!progress) {
      return phase.isLocked && phase.id !== 1 ? 'border-gray-200' : 'phoenix-border-primary';
    }

    switch (progress.status) {
      case 'completed':
        return 'phoenix-border-success';
      case 'in_progress':
        return 'phoenix-border-primary';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <Card className={`hover:shadow-xl transition-shadow p-6 border-l-4 ${getBorderColor()}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 ${getStatusColor()} rounded-full flex items-center justify-center`}>
          {getStatusIcon()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
          <span className={`text-sm font-medium ${getStatusTextColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <p className="phoenix-text-gray text-sm mb-4">{phase.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs phoenix-text-gray">
          {progress ? `${progress.exercisesCompleted}` : '0'} of {progress?.totalExercises || '0'} exercises completed
        </span>

        {isPhaseUnlocked ? (
          // Standard Access Logic: Phase is unlocked (Phase 1 or Subscribed)
          ((!progress && (!phase.isLocked || phase.id === 1)) || progress?.status === 'in_progress') ? (
            <Link href={`/phase/${phase.id}`}>
              <Button className="phoenix-bg-primary hover:phoenix-bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                {!progress ? 'Start Phase' : 'Continue'}
              </Button>
            </Link>
          ) : progress?.status === 'completed' ? (
            <Link href={`/phase/${phase.id}`}>
              <Button variant="outline" className="phoenix-text-primary text-sm font-medium">
                Review
              </Button>
            </Link>
          ) : (
            <Button disabled variant="outline" className="text-gray-400 text-sm font-medium border-gray-200">
              Locked
            </Button>
          )
        ) : (
          // Not Subscribed & Phase > 1: Show Get Access button
          <Link href="/pricing?tier=essential">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Get Access
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
