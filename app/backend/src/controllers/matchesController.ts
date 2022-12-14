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

  async create(req: Request, res: Response) {
    const { service } = this;
    const matcheData = req.body;

    const newMatche = await service.create(matcheData);

    res.status(StatusCodes.CREATED).json(newMatche);
  }

  async finish(req: Request, res: Response) {
    const { service } = this;
    const { id } = req.params;

    service.finish(Number(id));

    const message = 'Finished';
    res.status(StatusCodes.OK).json({ message });
  }

  async changeScore(req: Request, res: Response) {
    const { service } = this;
    const { params: { id }, body } = req;

    service.changeScore(body, Number(id));

    const message = 'Score changed!';
    res.status(StatusCodes.OK).json({ message });
  }
}
