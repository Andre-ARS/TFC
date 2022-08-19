import * as express from 'express';
import { TeamsController } from '../controllers';
import { TeamsService } from '../services';

const teamsRouter = express.Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));

export default teamsRouter;
