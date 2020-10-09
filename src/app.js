import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.server.listen(3333);

    this.server.use(express.json());
    this.server.use(cors());
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
