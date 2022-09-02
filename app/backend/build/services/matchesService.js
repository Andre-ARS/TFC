"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Matches_1 = require("../database/models/Matches");
const Teams_1 = require("../database/models/Teams");
const validations_1 = require("./validations");
class MatchesService {
    constructor() {
        this.model = Matches_1.default;
    }
    async getAll() {
        const { model } = this;
        const matches = await model.findAll({
            include: [
                { model: Teams_1.default, as: 'teamHome', attributes: ['teamName'] },
                { model: Teams_1.default, as: 'teamAway', attributes: ['teamName'] },
            ],
        });
        return matches;
    }
    async filter(progress) {
        const { model } = this;
        const matches = await model.findAll({
            where: { inProgress: progress },
            include: [
                { model: Teams_1.default, as: 'teamHome', attributes: ['teamName'] },
                { model: Teams_1.default, as: 'teamAway', attributes: ['teamName'] },
            ],
        });
        return matches;
    }
    async create(data) {
        const { model } = this;
        const { count } = await Teams_1.default.findAndCountAll({
            where: {
                id: { [sequelize_1.Op.in]: [data.homeTeam, data.awayTeam] },
            },
        });
        (0, validations_1.validateCreateMatche)(data, count);
        const newMatche = await model.create({ ...data, inProgress: true });
        return newMatche;
    }
    async finish(id) {
        const { model } = this;
        await model.update({ inProgress: false }, {
            where: { id },
        });
    }
    async changeScore(data, id) {
        const { model } = this;
        await model.update(data, {
            where: { id },
        });
    }
}
exports.default = MatchesService;
//# sourceMappingURL=matchesService.js.map