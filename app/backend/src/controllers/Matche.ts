import { Request, Response } from 'express';
import { MatcheService } from '../services';

export default class MatcheController {
  constructor(private matcheService = new MatcheService()) {}

  public async getAllMatches(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.matcheService.getAllMatches();
    res.status(200).json(result);
  }
}
