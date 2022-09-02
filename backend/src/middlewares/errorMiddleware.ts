import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message, status } = err;

  if (status) return res.status(status).json({ message });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default errorMiddleware;
