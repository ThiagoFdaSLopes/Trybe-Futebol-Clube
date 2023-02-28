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

  public async finishMatche(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    await this.matcheService.finishMatche(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  public async EditMatches(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    await this.matcheService.EditMatche(Number(id), req.body);
    res.status(200).json({ message: 'Placar Alterado' });
  }
}
