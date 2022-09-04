"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class MatchesController {
    constructor(service) {
        this.service = service;
    }
    async getAll(req, res) {
        const { service } = this;
        if (req.query.inProgress) {
            const { inProgress } = req.query;
            const progress = inProgress === 'true';
            const matches = await service.filter(progress);
            return res.status(http_status_codes_1.StatusCodes.OK).json(matches);
        }
        const matches = await service.getAll();
        return res.status(http_status_codes_1.StatusCodes.OK).json(matches);
    }
    async create(req, res) {
        const { service } = this;
        const matcheData = req.body;
        const newMatche = await service.create(matcheData);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(newMatche);
    }
    async finish(req, res) {
        const { service } = this;
        const { id } = req.params;
        service.finish(Number(id));
        const message = 'Finished';
        res.status(http_status_codes_1.StatusCodes.OK).json({ message });
    }
    async changeScore(req, res) {
        const { service } = this;
        const { params: { id }, body } = req;
        service.changeScore(body, Number(id));
        const message = 'Score changed!';
        res.status(http_status_codes_1.StatusCodes.OK).json({ message });
    }
}
exports.default = MatchesController;
//# sourceMappingURL=matchesController.js.map