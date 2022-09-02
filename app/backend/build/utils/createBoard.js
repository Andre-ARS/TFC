"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLeaderboard = void 0;
const getTeamInfo_1 = require("./getTeamInfo");
const getTeamNumbers = (matches) => {
    const games = matches.length;
    const [wins, losses, draws] = matches[0].teamHome ? (0, getTeamInfo_1.homeNumbers)(matches) : (0, getTeamInfo_1.awayNumbers)(matches);
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
const getGoals = (matches) => {
    const [favor, own] = matches[0].teamHome ? (0, getTeamInfo_1.homeGoals)(matches) : (0, getTeamInfo_1.awayGoals)(matches);
    return {
        goalsFavor: favor,
        goalsOwn: own,
        goalsBalance: (favor - own),
    };
};
const sortLeaderboard = (a, b) => {
    const props = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn', 'draw'];
    let sort;
    for (let i = 0; i < props.length; i += 1) {
        if (props[i] === 'goalsOwn') {
            sort = a[props[i]] - b[props[i]];
        }
        else {
            sort = b[props[i]] - a[props[i]];
        }
        if (sort !== 0)
            break;
        if (props[i] === 'draw') {
            sort = 0;
            break;
        }
    }
    return sort;
};
const removeDuplicates = (board) => {
    const unique = [];
    board.forEach((team, i) => {
        if (i === 0)
            unique.push(team);
        if (!unique.some(({ name }) => name === team.name)) {
            unique.push(team);
        }
    });
    return unique;
};
const formattBoard = (matches) => {
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
    });
    const uniqueBoard = removeDuplicates(board);
    return uniqueBoard;
};
const generateBoard = (matches) => {
    const uniqueBoard = formattBoard(matches);
    const leaderboard = uniqueBoard.sort(sortLeaderboard);
    return leaderboard;
};
const formattLeaderboard = (homeTeams, awayTeams) => {
    const board = homeTeams.map((team, i) => {
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
const generateLeaderboard = (homeMatches, awayMatches) => {
    const homeTeams = formattBoard(homeMatches).sort((a, b) => a.name.localeCompare(b.name));
    const awayTeams = formattBoard(awayMatches).sort((a, b) => a.name.localeCompare(b.name));
    const board = formattLeaderboard(homeTeams, awayTeams);
    const sortedBoard = board.sort(sortLeaderboard);
    return sortedBoard;
};
exports.generateLeaderboard = generateLeaderboard;
exports.default = generateBoard;
//# sourceMappingURL=createBoard.js.map