import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers';

export default class PasswordService {
  static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
  }

  static checkPassword(password: string, hash:string) {
    const isValid = bcrypt.compareSync(password, hash);

    if (!isValid) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
}
