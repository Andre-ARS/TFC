import * as express from 'express';
import loginRouter from './login.routes';
import teamsRouter from './teams.routes';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
