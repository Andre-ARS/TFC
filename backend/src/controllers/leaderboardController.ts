import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces/IService';

export default class LeaderboardController {
  constructor(private service: ILeaderboardService) { }

  async getHomeBoard(req: Request, res: Response) {
    const { service } = this;

    const board = await service.getHomeBoard();

    res.status(StatusCodes.OK).json(board);
  }

  async getAwayBoard(req: Request, res: Response) {
    const { service } = this;

    const board = await service.getAwayBoard();

    res.status(StatusCodes.OK).json(board);
  }

  async getLeaderboard(req: Request, res: Response) {
    const { service } = this;

    const board = await service.getLeaderboard();

    res.status(StatusCodes.OK).json(board);
  }
}
