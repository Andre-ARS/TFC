"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorMiddleware = (err, _req, res, _next) => {
    const { message, status } = err;
    if (status)
        return res.status(status).json({ message });
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map