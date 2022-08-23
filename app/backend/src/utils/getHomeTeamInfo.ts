import { IBoardTeam } from '../interfaces';
import { IMatcheResponse } from '../interfaces/IMatche';

const getTeamNumbers = (matches: IMatcheResponse[]): object => {
  let wins = 0;
  let draws = 0;
  let losses = 0;
  const games = matches.length;

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) wins += 1;
    if (homeTeamGoals < awayTeamGoals) losses += 1;
    if (homeTeamGoals === awayTeamGoals) draws += 1;
  });

  const points = (wins * 3 + draws);

  return {
    totalPoints: points,
    totalGames: games,
    totalVictories: wins,
    totalDraws: draws,
    totalLosses: losses,
    efficiency: ((points / (games * 3)) * 100).toFixed(2),
  };
};

const getGoals = (matches: IMatcheResponse[]): object => {
  let favor = 0;
  let own = 0;

  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    favor += homeTeamGoals;
    own += awayTeamGoals;
  });

  return {
    goalsFavor: favor,
    goalsOwn: own,
    goalsBalance: (favor - own),
  };
};

const sortLeaderboard = (a: any, b: any): number => {
  const props = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn', 'draw'];
  let sort;

  for (let i = 0; i < props.length; i += 1) {
    if (props[i] === 'goalsOwn') {
      sort = a[props[i]] - b[props[i]];
    } else {
      sort = b[props[i]] - a[props[i]];
    }

    if (sort !== 0) break;
    if (props[i] === 'draw') {
      sort = 0;
      break;
    }
  }

  return sort as number;
};

const removeDuplicates = (board: IBoardTeam[]) => {
  const unique: any = [];

  board.forEach((team, i) => {
    if (i === 0) unique.push(team);

    if (!unique.some(({ name }: IBoardTeam) => name === team.name)) {
      unique.push(team);
    }
  });

  return unique as IBoardTeam[];
};

const generateBoard = (matches: IMatcheResponse[]): IBoardTeam[] => {
  const board = matches.map((matche) => {
    const { teamHome: { teamName }, homeTeam } = matche;
    const teamMatches = matches.filter(({ homeTeam: teamId }) => teamId === homeTeam);

    return {
      name: teamName,
      ...getTeamNumbers(teamMatches),
      ...getGoals(teamMatches),
    };
  }) as any;

  const uniqueBoard = removeDuplicates(board);

  const leaderboard = uniqueBoard.sort(sortLeaderboard);

  return leaderboard as IBoardTeam[];
};

export default generateBoard;
