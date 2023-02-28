import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async GetResultsHome(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.leaderBoardService.GetResults('home');
    res.status(200).json(result);
  }

  public async GetResultsAway(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.leaderBoardService.GetResults('away');
    res.status(200).json(result);
  }
}
