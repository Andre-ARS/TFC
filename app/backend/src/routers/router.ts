import * as express from 'express';
import loginRouter from './login.routes';

const router = express.Router();

router.post('/login', loginRouter);

export default router;
