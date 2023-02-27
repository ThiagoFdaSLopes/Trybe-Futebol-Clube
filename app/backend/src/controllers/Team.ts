import { Request, Response } from 'express';
import TeamService from '../services';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response | void> {
    try {
      const result = await this.teamService.getAllTeams();
      res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
}
