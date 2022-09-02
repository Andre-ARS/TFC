export interface IUser extends IUserSimple {
  password: string;
}

export interface IUserSimple {
  id: number;
  username: string;
  role: string;
  email: string;
}
