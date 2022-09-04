"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const Joi = require("joi");
const helpers_1 = require("../../helpers");
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(data);
    if (error)
        throw new helpers_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'All fields must be filled');
};
exports.default = validateLogin;
//# sourceMappingURL=loginValidation.js.map