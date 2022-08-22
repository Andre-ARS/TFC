import { Op } from 'sequelize';
import { IMatchesService } from '../interfaces/IService';
import Matches from '../database/models/Matches';
import { IMatche, IMatcheResponse } from '../interfaces';
import Teams from '../database/models/Teams';
import { validateCreateMatche } from './validations';

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

  async create(data: any): Promise<IMatche> {
    const { model } = this;

    const { count } = await Teams.findAndCountAll({
      where: {
        id: { [Op.in]: [data.homeTeam, data.awayTeam] },
      },
    });

    validateCreateMatche(data, count);

    const newMatche = await model.create({ ...data, inProgress: true }) as IMatche;

    return newMatche;
  }

  async finish(id: number): Promise<void> {
    const { model } = this;

    await model.update({ inProgress: false }, {
      where: { id },
    });
  }

  async changeScore(data: object, id: number): Promise<void> {
    const { model } = this;

    await model.update(data, {
      where: { id },
    });
  }
}
