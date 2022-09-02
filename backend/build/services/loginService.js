"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const helpers_1 = require("../helpers");
const Users_1 = require("../database/models/Users");
const passwordService_1 = require("./passwordService");
const jwtService_1 = require("./jwtService");
const validations_1 = require("./validations");
class LoginService {
    constructor() {
        this.model = Users_1.default;
    }
    async login({ email, password }) {
        const { model } = this;
        (0, validations_1.validateLogin)({ email, password });
        const user = await model.findOne({ where: { email } });
        if (!user)
            throw new helpers_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
        passwordService_1.default.checkPassword(password, user.password);
        const token = jwtService_1.default.createToken(user);
        return { token };
    }
}
exports.default = LoginService;
//# sourceMappingURL=loginService.js.map