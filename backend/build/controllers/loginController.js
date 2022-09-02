"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class LoginController {
    constructor(LoginService) {
        this.LoginService = LoginService;
    }
    async login(req, res) {
        const loginData = req.body;
        const token = await this.LoginService.login(loginData);
        res.status(http_status_codes_1.StatusCodes.OK).json(token);
    }
    static async loginValidate(req, res, _next) {
        const { role } = req.body.user;
        res.status(http_status_codes_1.StatusCodes.OK).json({ role });
    }
}
exports.default = LoginController;
//# sourceMappingURL=loginController.js.map