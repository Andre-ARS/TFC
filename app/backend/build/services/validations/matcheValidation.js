"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const helpers_1 = require("../../helpers");
const EQUAL_MESSAGE = 'It is not possible to create a match with two equal teams';
const NOT_FOUND_TEAM = 'There is no team with such id!';
const validateCreateMatche = ({ homeTeam, awayTeam }, count) => {
    if (homeTeam === awayTeam) {
        throw new helpers_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, EQUAL_MESSAGE);
    }
    if (count < 2) {
        throw new helpers_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, NOT_FOUND_TEAM);
    }
};
exports.default = validateCreateMatche;
//# sourceMappingURL=matcheValidation.js.map