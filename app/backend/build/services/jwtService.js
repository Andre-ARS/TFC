"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const helpers_1 = require("../helpers");
dotenv.config();
const secret = process.env.JWT_SECRET || 'jwt-secret';
class JwtService {
    static createToken(payload) {
        const jwtConfig = {
            expiresIn: '15d',
            algorithm: 'HS256',
        };
        const token = Jwt.sign({ data: payload }, secret, jwtConfig);
        return token;
    }
    static validateToken(token) {
        try {
            const userData = Jwt.verify(token, secret);
            return userData;
        }
        catch (error) {
            throw new helpers_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
        }
    }
}
exports.default = JwtService;
//# sourceMappingURL=jwtService.js.map