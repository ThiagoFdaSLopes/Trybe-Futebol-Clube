import { ModelStatic } from 'sequelize';
import { Results } from '../interfaces/Results';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

export default class LeaderBoardService {
  protected model: ModelStatic<Matche> = Matche;
  static modelTeam: ModelStatic<Team> = Team;

  public async GetResults(): Promise<any> {
    const matches = await this.model.findAll(
      { where: { inProgress: false } },
    );
    const teste = LeaderBoardService.createObj(await LeaderBoardService.GetAllTeams(), matches);
    return teste;
  }

  static async GetAllTeams(): Promise<Team[]> {
    const resultTeams = await LeaderBoardService.modelTeam.findAll();
    return resultTeams;
  }

  static createObj(teams: Team[], matches: Matche[]) {
    const arrayTeams = teams.map((team) => ({
      name: team.dataValues.teamName as string,
      totalPoints: LeaderBoardService.totalPoints(matches, team.id),
      totalGames: LeaderBoardService.getTotalGames(matches, team.id),
      totalVictories: LeaderBoardService.getMatchesTeamsVictories(matches, team.id),
      totalDraws: LeaderBoardService.getMatchesTeamsDraws(matches, team.id),
      totalLosses: LeaderBoardService.getMatchesTeamsLosses(matches, team.id),
      goalsFavor: LeaderBoardService.getTotalGoalsFavor(matches, team.id),
      goalsOwn: LeaderBoardService.getTotalGoalsOwn(matches, team.id),
      goalsBalance: LeaderBoardService.goalsBalance(matches, team.id),
      efficiency: LeaderBoardService.getEfficiency(matches, team.id),
    }));
    const sorted = LeaderBoardService.sortTeams(arrayTeams);
    return sorted;
  }

  static getMatchesTeamsVictories(matches: Matche[], teamId: number): number {
    return matches.filter(
      (match) => match.homeTeamId === teamId,
    ).filter((team) => team.homeTeamGoals > team.awayTeamGoals).length;
  }

  static getMatchesTeamsDraws(matches: Matche[], teamId: number): number {
    return matches.filter(
      (match) => match.homeTeamId === teamId,
    ).filter((team) => team.homeTeamGoals === team.awayTeamGoals).length;
  }

  static getMatchesTeamsLosses(matches: Matche[], teamId: number): number {
    return matches.filter(
      (match) => match.homeTeamId === teamId,
    ).filter((team) => team.homeTeamGoals < team.awayTeamGoals).length;
  }

  static getTotalGoalsFavor(matches: Matche[], teamId: number): number {
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr.homeTeamId === teamId) {
        goals += curr.homeTeamGoals;
      }
      return goals;
    }, 0);
  }

  static getTotalGoalsOwn(matches: Matche[], teamId: number): number {
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr.homeTeamId === teamId) {
        goals += curr.awayTeamGoals;
      }
      return goals;
    }, 0);
  }

  static getTotalGames(matches: Matche[], teamId: number): number {
    return matches.filter((match) => match.homeTeamId === teamId).length;
  }

  static totalPoints(matches: Matche[], teamId: number): number {
    return (
      LeaderBoardService.getMatchesTeamsVictories(matches, teamId) * 3)
      + (LeaderBoardService.getMatchesTeamsDraws(matches, teamId) * 1);
  }

  static goalsBalance(matches: Matche[], teamId: number): number {
    return LeaderBoardService.getTotalGoalsFavor(matches, teamId)
    - LeaderBoardService.getTotalGoalsOwn(matches, teamId);
  }

  static getEfficiency(matches: Matche[], teamId: number): number {
    const pontos = LeaderBoardService.totalPoints(matches, teamId);
    const jogos = LeaderBoardService.getTotalGames(matches, teamId);

    const resultado = Number(((pontos / (jogos * 3)) * 100).toFixed(2));

    return resultado;
  }

  static sortTeams(arr: Results[]): Results[] {
    return arr.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.goalsFavor - a.goalsOwn !== b.goalsFavor - b.goalsOwn) {
        return b.goalsFavor - b.goalsOwn - a.goalsFavor + a.goalsOwn;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }
}
