import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ITeamsService } from '../interfaces/IService';

export default class TeamsController {
  constructor(private service: ITeamsService) { }

  async getAll(_req: Request, res: Response) {
    const { service } = this;

    const teams = await service.getAll();

    res.status(StatusCodes.OK).json(teams);
  }
}
