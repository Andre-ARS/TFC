"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Teams_1 = require("./Teams");
class Matches extends sequelize_1.Model {
}
Matches.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    homeTeam: {
        type: sequelize_1.INTEGER,
        field: 'home_team',
        allowNull: false,
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
    },
    awayTeam: {
        type: sequelize_1.INTEGER,
        field: 'away_team',
        allowNull: false,
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
        field: 'away_team_goals',
        allowNull: false,
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
        field: 'in_progress',
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'matches',
    timestamps: false,
});
Matches.belongsTo(Teams_1.default, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams_1.default, { foreignKey: 'awayTeam', as: 'teamAway' });
exports.default = Matches;
//# sourceMappingURL=Matches.js.map