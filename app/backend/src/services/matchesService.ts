import { IMatchesService } from '../interfaces/IService';
import Matches from '../database/models/Matches';
import { IMatcheResponse } from '../interfaces';
import Teams from '../database/models/Teams';

export default class MatchesService implements IMatchesService {
  private model;

  constructor() {
    this.model = Matches;
  }

  async getAll(): Promise<IMatcheResponse[]> {
    const { model } = this;

    const matches = await model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    }) as IMatcheResponse[];

    return matches;
  }

  async filter(progress: boolean): Promise<IMatcheResponse[]> {
    const { model } = this;

    const matches = await model.findAll({
      where: { inProgress: progress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    }) as IMatcheResponse[];

    return matches;
  }
}
