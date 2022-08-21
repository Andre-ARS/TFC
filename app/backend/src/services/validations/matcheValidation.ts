import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import CustomError from '../../helpers';

const validateCreateMatche = (data: object) => {
  const schema = Joi.object({
    homeTeam: Joi.number().required(),
    awayTeam: Joi.number().required(),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
    inProgress: Joi.boolean(),
  });

  const { error } = schema.validate(data);

  if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
};

export default validateCreateMatche;
