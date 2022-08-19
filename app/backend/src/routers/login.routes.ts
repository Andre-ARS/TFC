import * as express from 'express';
import { tokenMiddleware } from '../middlewares';
import LoginController from '../controllers';
import { LoginService } from '../services';

const loginRouter = express.Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', (req, res) => loginController.login(req, res));
loginRouter.get('/validate', tokenMiddleware, LoginController.loginValidate);

export default loginRouter;
