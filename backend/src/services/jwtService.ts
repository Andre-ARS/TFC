import { StatusCodes } from 'http-status-codes';
import * as Jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUserSimple } from '../interfaces';
import CustomError from '../helpers';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt-secret';

export default class JwtService {
  static createToken(payload: IUserSimple): string {
    const jwtConfig: Jwt.SignOptions = {
      expiresIn: '15d',
      algorithm: 'HS256',
    };

    const token = Jwt.sign({ data: payload }, secret, jwtConfig);

    return token;
  }

  static validateToken(token: string) {
    try {
      const userData = Jwt.verify(token, secret);

      return userData;
    } catch (error) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  }
}
