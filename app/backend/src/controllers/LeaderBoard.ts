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

  public async GetResults(_req: Request, res: Response): Promise<Response | void> {
    const resultsHome = await this.leaderBoardService.GetResults('home');
    const resultsAway = await this.leaderBoardService.GetResults('away');

    const results = LeaderBoardService.GetLeaderBoard(resultsHome, resultsAway);

    res.status(200).json(results);
  }
}
