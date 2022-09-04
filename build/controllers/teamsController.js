"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class TeamsController {
    constructor(service) {
        this.service = service;
    }
    async getAll(_req, res) {
        const { service } = this;
        const teams = await service.getAll();
        res.status(http_status_codes_1.StatusCodes.OK).json(teams);
    }
    async getById(req, res) {
        const { service } = this;
        const { id } = req.params;
        const team = await service.getById(Number(id));
        res.status(http_status_codes_1.StatusCodes.OK).json(team);
    }
}
exports.default = TeamsController;
//# sourceMappingURL=teamsController.js.map