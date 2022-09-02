"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matches_1 = require("../database/models/Matches");
const Teams_1 = require("../database/models/Teams");
const utils_1 = require("../utils");
class LeaderboardService {
    constructor() {
        this.model = Matches_1.default;
    }
    async getHomeBoard() {
        const { model } = this;
        const matches = await model.findAll({
            where: { inProgress: 0 },
            include: [
                { model: Teams_1.default, as: 'teamHome', attributes: ['teamName'] },
            ],
        });
        const board = (0, utils_1.default)(matches);
        return board;
    }
    async getAwayBoard() {
        const { model } = this;
        const matches = await model.findAll({
            where: { inProgress: 0 },
            include: [
                { model: Teams_1.default, as: 'teamAway', attributes: ['teamName'] },
            ],
        });
        const board = (0, utils_1.default)(matches);
        return board;
    }
    async getLeaderboard() {
        const { model } = this;
        const homeMatches = await model.findAll({
            where: { inProgress: 0 },
            include: [
                { model: Teams_1.default, as: 'teamHome', attributes: ['teamName'] },
            ],
        });
        const awayMatches = await model.findAll({
            where: { inProgress: 0 },
            include: [
                { model: Teams_1.default, as: 'teamAway', attributes: ['teamName'] },
            ],
        });
        const board = (0, utils_1.generateLeaderboard)(homeMatches, awayMatches);
        return board;
    }
}
exports.default = LeaderboardService;
//# sourceMappingURL=leaderboardService.js.map