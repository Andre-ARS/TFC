import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JwtService from '../services/jwtService';

const tokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  const { data } = JwtService.validateToken(token) as JwtPayload;

  req.body.user = data;

  next();
};

export default tokenMiddleware;
