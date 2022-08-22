import { StatusCodes } from 'http-status-codes';
import CustomError from '../../helpers';

const EQUAL_MESSAGE = 'It is not possible to create a match with two equal teams';

const validateCreateMatche = ({ homeTeam, awayTeam }: any) => {
  if (homeTeam === awayTeam) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, EQUAL_MESSAGE);
  }
};

export default validateCreateMatche;
