import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';

export default class TeamService {
  protected model: ModelStatic<Team> = Team;

  async getAllTeams(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getTeamById(id: number): Promise<Team | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
