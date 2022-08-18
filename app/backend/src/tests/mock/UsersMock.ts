import { ITokenResponse, IUser } from '../../interfaces'

export const tokenMock: ITokenResponse = {
  token: 'any-token'
};

export const userResponseMock: IUser = {
  id: 1,
  username: 'any-name',
  role: 'any-role',
  email: 'any-email',
  password: 'any-password'
};
