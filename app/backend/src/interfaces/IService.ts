import ITokenResponse from './ITokenResponse';

export interface ILoginService {
  login({ email, password }: any): Promise<ITokenResponse | void>
}
