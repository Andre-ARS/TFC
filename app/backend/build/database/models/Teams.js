"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Teams extends sequelize_1.Model {
}
Teams.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    teamName: {
        type: sequelize_1.STRING,
        field: 'team_name',
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'teams',
    timestamps: false,
});
exports.default = Teams;
//# sourceMappingURL=Teams.js.map