import { IBoardTeam } from '../interfaces';
import { IMatcheResponse } from '../interfaces/IMatche';
import { awayGoals, awayNumbers, homeGoals, homeNumbers } from './getTeamInfo';

const getTeamNumbers = (matches: IMatcheResponse[]): object => {
  const games = matches.length;
  const [wins, losses, draws] = matches[0].teamHome ? homeNumbers(matches) : awayNumbers(matches);
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
  const [favor, own] = matches[0].teamHome ? homeGoals(matches) : awayGoals(matches);

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

const formattBoard = (matches: IMatcheResponse[]): IBoardTeam[] => {
  const board = matches.map((matche) => {
    const id = matche.teamHome ? matche.homeTeam : matche.awayTeam;
    const team = matche.teamHome || matche.teamAway;
    const teamMatches = matche.teamHome
      ? matches.filter(({ homeTeam: teamId }) => teamId === id)
      : matches.filter(({ awayTeam: teamId }) => teamId === id);

    return {
      name: team.teamName,
      ...getTeamNumbers(teamMatches),
      ...getGoals(teamMatches),
    };
  }) as any;

  const uniqueBoard = removeDuplicates(board);

  return uniqueBoard;
};

const generateBoard = (matches: IMatcheResponse[]): IBoardTeam[] => {
  const uniqueBoard = formattBoard(matches);

  const leaderboard = uniqueBoard.sort(sortLeaderboard);

  return leaderboard as IBoardTeam[];
};

const formattLeaderboard = (homeTeams: IBoardTeam[], awayTeams: IBoardTeam[]) => {
  const board: IBoardTeam[] = homeTeams.map((team, i) => {
    const points = team.totalPoints + awayTeams[i].totalPoints;
    const games = team.totalGames + awayTeams[i].totalGames;

    return {
      name: team.name,
      totalPoints: points,
      totalGames: games,
      totalVictories: team.totalVictories + awayTeams[i].totalVictories,
      totalDraws: team.totalDraws + awayTeams[i].totalDraws,
      totalLosses: team.totalLosses + awayTeams[i].totalLosses,
      goalsFavor: team.goalsFavor + awayTeams[i].goalsFavor,
      goalsOwn: team.goalsOwn + awayTeams[i].goalsOwn,
      goalsBalance: team.goalsBalance + awayTeams[i].goalsBalance,
      efficiency: ((points / (games * 3)) * 100).toFixed(2),
    };
  });

  return board;
};

const generateLeaderboard = (homeMatches: IMatcheResponse[], awayMatches: IMatcheResponse[]) => {
  const homeTeams = formattBoard(homeMatches).sort((a, b) => a.name.localeCompare(b.name));
  const awayTeams = formattBoard(awayMatches).sort((a, b) => a.name.localeCompare(b.name));

  const board = formattLeaderboard(homeTeams, awayTeams);

  const sortedBoard = board.sort(sortLeaderboard);

  return sortedBoard;
};

export { generateLeaderboard };
export default generateBoard;
