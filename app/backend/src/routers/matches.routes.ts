import * as express from 'express';
import { tokenMiddleware } from '../middlewares';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';

const matchesRouter = express.Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post('/', tokenMiddleware, (req, res) => matchesController.create(req, res));
matchesRouter.patch(
  '/:id/finish',
  tokenMiddleware,
  (req, res) => matchesController.finish(req, res),
);

export default matchesRouter;
