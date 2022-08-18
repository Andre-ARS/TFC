import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers';
import Users from '../database/models/Users';
import { ITokenResponse } from '../interfaces';
import PasswordService from './passwordService';
import JwtService from './jwtService';
import { ILoginService } from '../interfaces/IService';

export default class LoginService implements ILoginService {
  private model;

  constructor() {
    this.model = Users;
  }

  async login({ email, password }: any): Promise<ITokenResponse | void> {
    const { model } = this;

    const user = await model.findOne({ where: { email } });

    if (!user) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    PasswordService.checkPassword(password, user.password);

    const token = JwtService.createToken(user);

    return { token };
  }
}
