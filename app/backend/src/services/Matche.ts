import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import Matche from '../database/models/Matche';

export default class MatcheService {
  protected model: ModelStatic<Matche> = Matche;

  async getAllMatches(): Promise<Matche[]> {
    const result = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ] },
    );
    return result;
  }
}
