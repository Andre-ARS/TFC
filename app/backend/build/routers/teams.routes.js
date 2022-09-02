"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const teamsRouter = express.Router();
const teamsService = new services_1.TeamsService();
const teamsController = new controllers_1.TeamsController(teamsService);
teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getById(req, res));
exports.default = teamsRouter;
//# sourceMappingURL=teams.routes.js.map