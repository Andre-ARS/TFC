import { ITeam, ITeamsService } from '../interfaces';
import Teams from '../database/models/Teams';

export default class TeamsService implements ITeamsService {
  private model;

  constructor() {
    this.model = Teams;
  }

  async getAll(): Promise<ITeam[]> {
    const { model } = this;

    const teams = await model.findAll() as ITeam[];

    return teams;
  }

  async getById(id: number): Promise<ITeam> {
    const { model } = this;

    const team = await model.findByPk(id) as ITeam;

    return team;
  }
}
