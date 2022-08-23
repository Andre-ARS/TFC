import * as express from 'express';
import { LeaderboardController } from '../controllers';
import { LeaderboardService } from '../services';

const leaderboardRouter = express.Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/home', (req, res) => leaderboardController.getHomeBoard(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getAwayBoard(req, res));

export default leaderboardRouter;
