import { Request, Response } from 'express';
import { GoalService } from '../services/goalService';
import { sendSuccess, sendError } from '../utils/responseHelper';
import { FitnessGoal } from '../models/Goal';

export class GoalController {
  public static getGoal(req: Request, res: Response) {
    try {
      const activeGoal = GoalService.getActiveGoal();
      sendSuccess(res, { activeGoal }, 'Active goal retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  public static updateGoal(req: Request, res: Response) {
    try {
      const { goal } = req.body;
      
      if (!goal) {
        return sendError(res, 'Goal is required');
      }

      const updatedGoal = GoalService.updateGoal(goal as FitnessGoal);
      sendSuccess(res, { activeGoal: updatedGoal }, 'Goal updated successfully');
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
