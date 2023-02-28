import { ModelStatic, Op } from 'sequelize';
import { BodyEditMactche } from '../interfaces/BodyEditMatche';
import Team from '../database/models/Team';
import Matche from '../database/models/Matche';

export default class MatcheService {
  protected model: ModelStatic<Matche> = Matche;

  async getAllMatches(inProgress?: boolean): Promise<Matche[]> {
    if (inProgress === undefined) {
      const result = await this.model.findAll(
        { include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ] },
      );
      return result;
    }
    const result = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { [Op.and]: [{ inProgress }] } },
    );
    return result;
  }

  async finishMatche(id: number): Promise<number[] | undefined> {
    try {
      const result = await this.model.update({ inProgress: false }, { where: { id } });
      return result;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  async EditMatche(id: number, body: BodyEditMactche): Promise<number[] | undefined> {
    try {
      const result = await this.model.update({ homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals }, { where: { id } });
      return result;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
