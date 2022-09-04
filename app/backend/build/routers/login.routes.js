"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const loginRouter = express.Router();
const loginService = new services_1.LoginService();
const loginController = new controllers_1.LoginController(loginService);
loginRouter.post('/', (req, res) => loginController.login(req, res));
loginRouter.get('/validate', middlewares_1.tokenMiddleware, controllers_1.LoginController.loginValidate);
exports.default = loginRouter;
//# sourceMappingURL=login.routes.js.map