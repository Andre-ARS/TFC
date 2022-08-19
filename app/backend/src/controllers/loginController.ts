import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILoginService } from '../interfaces';

export default class LoginController {
  constructor(private LoginService: ILoginService) { }

  async login(req: Request, res: Response) {
    const loginData = req.body;

    const token = await this.LoginService.login(loginData);

    res.status(StatusCodes.OK).json(token);
  }

  static async loginValidate(req: any, res: Response, _next: NextFunction) {
    const { role } = req.user;

    res.status(StatusCodes.OK).json({ role });
  }
}
