import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';

export default class TeamService {
  protected model: ModelStatic<Team> = Team;

  async getAllTeams(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }
}
