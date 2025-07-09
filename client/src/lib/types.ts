export interface PhaseProgress {
  phase: {
    id: number;
    letter: string;
    name: string;
    description: string;
    order: number;
    isLocked: boolean;
  };
  progress: {
    status: 'completed' | 'in_progress' | 'locked';
    exercisesCompleted: number;
    totalExercises: number;
    completedAt: Date | null;
  };
}

export interface QuickToolAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  action: () => void;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'radio' | 'scale' | 'text';
  options?: string[];
  min?: number;
  max?: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
}
