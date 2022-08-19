import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import CustomError from '../../helpers';

const validateLogin = (data: unknown) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(data);

  if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
};

export default validateLogin;
