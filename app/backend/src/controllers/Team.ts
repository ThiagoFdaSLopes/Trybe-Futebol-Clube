import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.teamService.getAllTeams();
    res.status(200).json(result);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response | void> {
    const result = await this.teamService.getTeamById(Number(req.params.id));
    res.status(200).json(result);
  }
}
