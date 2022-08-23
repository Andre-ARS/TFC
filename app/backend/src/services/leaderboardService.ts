import { IBoardTeam, ILeaderboardService, IMatcheResponse } from '../interfaces';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import getBoard from '../utils';

export default class LeaderboardService implements ILeaderboardService {
  private model;

  constructor() {
    this.model = Matches;
  }

  async getHomeBoard(): Promise<IBoardTeam[]> {
    const { model } = this;

    const matches = await model.findAll({
      where: { inProgress: 0 },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      ],
    }) as IMatcheResponse[];

    const board = getBoard(matches);

    return board;
  }

  async getAwayBoard(): Promise<IBoardTeam[]> {
    const { model } = this;

    const matches = await model.findAll({
      where: { inProgress: 0 },
      include: [
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    }) as IMatcheResponse[];

    const board = getBoard(matches);

    return board;
  }
}
