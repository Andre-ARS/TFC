import IMatche, { IMatcheResponse } from './IMatche';
import ITeam from './ITeam';
import ITokenResponse from './ITokenResponse';

export interface ILoginService {
  login({ email, password }: any): Promise<ITokenResponse | void>
}

export interface ITeamsService {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam>;
}

export interface IMatchesService {
  getAll(): Promise<IMatcheResponse[]>;
  filter(inProgress: boolean): Promise<IMatcheResponse[]>;
  create(data: object): Promise<IMatche>;
  finish(id: number): Promise<void>;
}
