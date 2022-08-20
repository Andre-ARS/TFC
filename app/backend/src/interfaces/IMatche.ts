export default interface IMatche {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number | boolean;
}

export interface IMatcheResponse extends IMatche {
  teamHome: {
    teamName: string
  }
  teamAway: {
    teamName: string
  }
}
