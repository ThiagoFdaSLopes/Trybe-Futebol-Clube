import { ModelStatic, Op } from 'sequelize';
import Invalid from '../utils/classError';
import { BodyCreateMatche } from '../interfaces/BodyCreateMatche';
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
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }

  async EditMatche(id: number, body: BodyEditMactche): Promise<number[] | undefined> {
    const result = await this.model.update({ homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals }, { where: { id } });
    return result;
  }

  async CreateMatche(
    { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: BodyCreateMatche,
  ): Promise<Matche> {
    try {
      if (homeTeamId === awayTeamId) {
        throw new Invalid('It is not possible to create a match with two equal teams', 422);
      }
      const result = await this.model.create(
        { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
      );
      return result;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
