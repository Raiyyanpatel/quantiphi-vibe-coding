import { FitnessGoal, GoalState } from '../models/Goal';

let currentState: GoalState = {
  activeGoal: 'maintenance' // default goal
};

export class GoalService {
  public static getActiveGoal(): FitnessGoal {
    return currentState.activeGoal;
  }

  public static updateGoal(newGoal: FitnessGoal): FitnessGoal {
    const validGoals: FitnessGoal[] = ['weight_loss', 'maintenance', 'muscle_gain'];
    
    if (!validGoals.includes(newGoal)) {
      throw new Error(`Invalid goal. Must be one of: ${validGoals.join(', ')}`);
    }

    currentState.activeGoal = newGoal;
    return currentState.activeGoal;
  }
}
