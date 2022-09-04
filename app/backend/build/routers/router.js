"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const leaderboard_routes_1 = require("./leaderboard.routes");
const login_routes_1 = require("./login.routes");
const matches_routes_1 = require("./matches.routes");
const teams_routes_1 = require("./teams.routes");
const router = express.Router();
router.use('/login', login_routes_1.default);
router.use('/teams', teams_routes_1.default);
router.use('/matches', matches_routes_1.default);
router.use('/leaderboard', leaderboard_routes_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map