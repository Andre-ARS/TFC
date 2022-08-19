import * as Jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUserSimple } from '../interfaces';

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
}
