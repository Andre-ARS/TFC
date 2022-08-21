import * as express from 'express';
import loginRouter from './login.routes';
import matchesRouter from './matches.routes';
import teamsRouter from './teams.routes';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
