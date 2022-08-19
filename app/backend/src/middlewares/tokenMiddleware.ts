import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JwtService from '../services/jwtService';

const tokenMiddleware: RequestHandler = (req: any, _res, next) => {
  const { authorization } = req.headers;

  const { data } = JwtService.validateToken(authorization) as JwtPayload;

  req.user = data;

  next();
};

export default tokenMiddleware;
