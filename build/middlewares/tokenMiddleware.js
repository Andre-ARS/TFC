"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = require("../services/jwtService");
const tokenMiddleware = (req, _res, next) => {
    const token = req.headers.authorization;
    const { data } = jwtService_1.default.validateToken(token);
    req.body.user = data;
    next();
};
exports.default = tokenMiddleware;
//# sourceMappingURL=tokenMiddleware.js.map