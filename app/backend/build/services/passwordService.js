"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const http_status_codes_1 = require("http-status-codes");
const helpers_1 = require("../helpers");
class PasswordService {
    static encryptPassword(password) {
        const salt = bcrypt.genSaltSync(5);
        const passwordHash = bcrypt.hashSync(password, salt);
        return passwordHash;
    }
    static checkPassword(password, hash) {
        const isValid = bcrypt.compareSync(password, hash);
        if (!isValid)
            throw new helpers_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
}
exports.default = PasswordService;
//# sourceMappingURL=passwordService.js.map