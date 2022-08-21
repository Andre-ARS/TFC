import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IService';

export default class MatchesController {
  constructor(private service: IMatchesService) { }

  async getAll(req: Request, res: Response) {
    const { service } = this;
    if (req.query.inProgress) {
      const { inProgress } = req.query;

      const progress = inProgress === 'true';

      const matches = await service.filter(progress);

      return res.status(StatusCodes.OK).json(matches);
    }

    const matches = await service.getAll();

    return res.status(StatusCodes.OK).json(matches);
  }
}
