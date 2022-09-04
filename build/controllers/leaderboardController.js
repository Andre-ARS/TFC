"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class LeaderboardController {
    constructor(service) {
        this.service = service;
    }
    async getHomeBoard(req, res) {
        const { service } = this;
        const board = await service.getHomeBoard();
        res.status(http_status_codes_1.StatusCodes.OK).json(board);
    }
    async getAwayBoard(req, res) {
        const { service } = this;
        const board = await service.getAwayBoard();
        res.status(http_status_codes_1.StatusCodes.OK).json(board);
    }
    async getLeaderboard(req, res) {
        const { service } = this;
        const board = await service.getLeaderboard();
        res.status(http_status_codes_1.StatusCodes.OK).json(board);
    }
}
exports.default = LeaderboardController;
//# sourceMappingURL=leaderboardController.js.map