import { ModelStatic } from 'sequelize';
import { Results } from '../interfaces/Results';
import Matche from '../database/models/Matche';
import Team from '../database/models/Team';

export default class LeaderBoardService {
  protected model: ModelStatic<Matche> = Matche;
  static modelTeam: ModelStatic<Team> = Team;

  public async GetResults(teamSide: string): Promise<Results[]> {
    const matches = await this.model.findAll(
      { where: { inProgress: false } },
    );
    const resultsHome = LeaderBoardService
      .createObj(await LeaderBoardService.GetAllTeams(), matches, teamSide);
    return resultsHome;
  }

  static async GetAllTeams(): Promise<Team[]> {
    const resultTeams = await LeaderBoardService.modelTeam.findAll();
    return resultTeams;
  }

  static createObj(teams: Team[], matches: Matche[], teamSide: string) {
    const arrayTeams = teams.map((team) => ({
      name: team.dataValues.teamName as string,
      totalPoints: LeaderBoardService.totalPoints(matches, team.id, teamSide),
      totalGames: LeaderBoardService.getTotalGames(matches, team.id, teamSide),
      totalVictories: LeaderBoardService.getMatchesTeamsVictories(matches, team.id, teamSide),
      totalDraws: LeaderBoardService.getMatchesTeamsDraws(matches, team.id, teamSide),
      totalLosses: LeaderBoardService.getMatchesTeamsLosses(matches, team.id, teamSide),
      goalsFavor: LeaderBoardService.getTotalGoals(matches, team.id, teamSide),
      goalsOwn: LeaderBoardService.getTotalGoalsOwn(matches, team.id, teamSide),
      goalsBalance: LeaderBoardService.calculateDiferenceGoals(
        LeaderBoardService.getTotalGoals(matches, team.id, teamSide),
        LeaderBoardService.getTotalGoalsOwn(matches, team.id, teamSide),
      ),
      efficiency: LeaderBoardService.getEfficiency(matches, team.id, teamSide),
    }));
    const sorted = LeaderBoardService.sortTeams(arrayTeams);
    return sorted;
  }

  static calculateDiferenceGoals(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  static getMatchesTeamsVictories(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]
    > team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static getMatchesTeamsDraws(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]
    === team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static getMatchesTeamsLosses(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.filter(
      (match) => match[side] === teamId,
    ).filter((team) => team[goalsTeam]
    < team[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`]).length;
  }

  static getTotalGoals(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    const goalsTeam = `${teamSide}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr[side] === teamId) {
        goals += curr[goalsTeam];
      }
      return goals;
    }, 0);
  }

  static getTotalGoalsOwn(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    return matches.reduce((acc, curr) => {
      let goals = acc;
      if (curr[side] === teamId) {
        goals += curr[`${teamSide === 'home' ? 'away' : 'home'}TeamGoals`];
      }
      return goals;
    }, 0);
  }

  static getTotalGames(matches: Matche[], teamId: number, teamSide: string): number {
    const side = `${teamSide}TeamId` as 'homeTeamId' | 'awayTeamId';
    return matches.filter((match) => match[side] === teamId).length;
  }

  static totalPoints(matches: Matche[], teamId: number, teamSide: string): number {
    return (
      LeaderBoardService.getMatchesTeamsVictories(matches, teamId, teamSide) * 3)
      + (LeaderBoardService.getMatchesTeamsDraws(matches, teamId, teamSide) * 1);
  }

  static getEfficiency(matches: Matche[], teamId: number, teamSide: string): number {
    const pontos = LeaderBoardService.totalPoints(matches, teamId, teamSide);
    const jogos = LeaderBoardService.getTotalGames(matches, teamId, teamSide);

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

  static GetLeaderBoard(home: Results[], away: Results[]): Results[] {
    const arrLeaders: Results[] = home.map((homeArr) => {
      const awayAndHome = away.find((el) => el.name === homeArr.name);
      return { name: homeArr.name,
        totalPoints: homeArr.totalPoints + (awayAndHome?.totalPoints ?? 0),
        totalGames: homeArr.totalGames + (awayAndHome?.totalGames ?? 0),
        totalVictories: homeArr.totalVictories + (awayAndHome?.totalVictories ?? 0),
        totalDraws: homeArr.totalDraws + (awayAndHome?.totalDraws ?? 0),
        totalLosses: homeArr.totalLosses + (awayAndHome?.totalLosses ?? 0),
        goalsFavor: homeArr.goalsFavor + (awayAndHome?.goalsFavor ?? 0),
        goalsOwn: homeArr.goalsOwn + (awayAndHome?.goalsOwn ?? 0),
        goalsBalance: homeArr.goalsBalance + (awayAndHome?.goalsBalance ?? 0),
        efficiency: LeaderBoardService.getEfi(
          homeArr.totalPoints + (awayAndHome?.totalPoints ?? 0),
          homeArr.totalGames + (awayAndHome?.totalGames ?? 0),
        ),
      };
    });
    return LeaderBoardService.sortTeams(arrLeaders);
  }

  static getEfi(pontosTotais: number, jogosTotais: number): number {
    const resultado = Number(((pontosTotais / (jogosTotais * 3)) * 100).toFixed(2));
    return resultado;
  }
}
