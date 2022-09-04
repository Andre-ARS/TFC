"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
const swaggerFile_1 = require("./swaggerFile");
class App {
    constructor() {
        this.app = express();
        this.config();
        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile_1.default));
        this.app.use(routers_1.default);
        this.app.use(middlewares_1.errorMiddleware);
        this.app.use(cors());
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}
Acesse a documentação http://localhost:3001/docs`));
    }
}
exports.App = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
//# sourceMappingURL=app.js.map