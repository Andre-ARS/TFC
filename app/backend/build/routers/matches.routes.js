"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middlewares_1 = require("../middlewares");
const matchesController_1 = require("../controllers/matchesController");
const matchesService_1 = require("../services/matchesService");
const matchesRouter = express.Router();
const matchesService = new matchesService_1.default();
const matchesController = new matchesController_1.default(matchesService);
matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post('/', middlewares_1.tokenMiddleware, (req, res) => matchesController.create(req, res));
matchesRouter.patch('/:id/finish', middlewares_1.tokenMiddleware, (req, res) => matchesController.finish(req, res));
matchesRouter.patch('/:id', middlewares_1.tokenMiddleware, (req, res) => matchesController.changeScore(req, res));
exports.default = matchesRouter;
//# sourceMappingURL=matches.routes.js.map