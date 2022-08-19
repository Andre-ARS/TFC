import * as express from 'express';
import LoginController from '../controllers';
import { LoginService } from '../services';

const loginRouter = express.Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/login', (req, res) => loginController.login(req, res));

export default loginRouter;
