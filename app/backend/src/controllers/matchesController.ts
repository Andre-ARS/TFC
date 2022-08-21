import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IService';

export default class MatchesController {
  constructor(private service: IMatchesService) { }

  async getAll(_req: Request, res: Response) {
    const { service } = this;

    const matches = await service.getAll();

    res.status(StatusCodes.OK).json(matches);
  }
}
