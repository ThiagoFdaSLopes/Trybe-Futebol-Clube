import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async GetResults(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.leaderBoardService.GetResults();
    res.status(200).json(result);
  }
}
