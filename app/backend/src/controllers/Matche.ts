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

    try {
      await this.matcheService.finishMatche(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  public async EditMatches(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    try {
      await this.matcheService.EditMatche(Number(id), req.body);
      res.status(200).json({ message: 'Placar Alterado' });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ message: error.message });
    }
  }
}
