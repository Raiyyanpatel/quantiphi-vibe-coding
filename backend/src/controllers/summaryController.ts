import { Request, Response } from 'express';
import { SummaryService } from '../services/summaryService';
import { sendSuccess, sendError } from '../utils/responseHelper';

export class SummaryController {
  public static getSummary(req: Request, res: Response) {
    try {
      const summary = SummaryService.getDailySummary();
      sendSuccess(res, summary, 'Daily summary retrieved successfully');
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
