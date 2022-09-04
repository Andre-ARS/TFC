import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import * as swaggerUI from 'swagger-ui-express';
import router from './routers';
import { errorMiddleware } from './middlewares';
import swaggerFile from './swaggerFile';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
    this.app.use(router);
    this.app.use(errorMiddleware);
    this.app.use(cors());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}
Acesse a documentação http://localhost:3001/docs`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
