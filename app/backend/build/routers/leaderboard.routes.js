"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const leaderboardRouter = express.Router();
const leaderboardService = new services_1.LeaderboardService();
const leaderboardController = new controllers_1.LeaderboardController(leaderboardService);
leaderboardRouter.get('/', (req, res) => leaderboardController.getLeaderboard(req, res));
leaderboardRouter.get('/home', (req, res) => leaderboardController.getHomeBoard(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getAwayBoard(req, res));
exports.default = leaderboardRouter;
//# sourceMappingURL=leaderboard.routes.js.map