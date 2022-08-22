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

  async create(data: object): Promise<IMatche> {
    const { model } = this;

    validateCreateMatche(data);

    const newMatche = await model.create({ ...data, inProgress: true }) as IMatche;

    return newMatche;
  }

  async finish(id: number): Promise<void> {
    const { model } = this;

    await model.update({ inProgress: false }, {
      where: { id },
    });
  }
}
