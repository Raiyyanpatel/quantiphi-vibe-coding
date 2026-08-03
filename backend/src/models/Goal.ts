export type FitnessGoal = 'weight_loss' | 'maintenance' | 'muscle_gain';

export interface GoalState {
  activeGoal: FitnessGoal;
}
