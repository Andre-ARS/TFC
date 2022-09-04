"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Teams_1 = require("../database/models/Teams");
class TeamsService {
    constructor() {
        this.model = Teams_1.default;
    }
    async getAll() {
        const { model } = this;
        const teams = await model.findAll();
        return teams;
    }
    async getById(id) {
        const { model } = this;
        const team = await model.findByPk(id);
        return team;
    }
}
exports.default = TeamsService;
//# sourceMappingURL=teamsService.js.map