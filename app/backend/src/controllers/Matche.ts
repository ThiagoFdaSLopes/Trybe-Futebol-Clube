import { Request, Response } from 'express';
import { MatcheService } from '../services';

export default class MatcheController {
  constructor(private matcheService = new MatcheService()) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const result = await this.matcheService.getAllMatches();
      return res.status(200).json(result);
    }

    const result = await this.matcheService.getAllMatches(inProgress === 'true');
    res.status(200).json(result);
  }
}
