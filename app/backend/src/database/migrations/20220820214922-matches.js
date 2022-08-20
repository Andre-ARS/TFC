"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        field: "home_team",
        references: {
          model: "teams",
          key: "id",
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: "home_team_goals",
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        field: "away_team",
        references: {
          model: "teams",
          key: "id",
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: "away_team_goals",
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: "in_progress",
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("matches");
  },
};
