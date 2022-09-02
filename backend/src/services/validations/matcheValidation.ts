import { StatusCodes } from 'http-status-codes';
import CustomError from '../../helpers';

const EQUAL_MESSAGE = 'It is not possible to create a match with two equal teams';
const NOT_FOUND_TEAM = 'There is no team with such id!';

const validateCreateMatche = ({ homeTeam, awayTeam }: any, count: number) => {
  if (homeTeam === awayTeam) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, EQUAL_MESSAGE);
  }

  if (count < 2) {
    throw new CustomError(StatusCodes.NOT_FOUND, NOT_FOUND_TEAM);
  }
};

export default validateCreateMatche;
