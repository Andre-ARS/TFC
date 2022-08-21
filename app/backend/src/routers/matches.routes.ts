import * as express from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';

const matchesRouter = express.Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));

export default matchesRouter;
