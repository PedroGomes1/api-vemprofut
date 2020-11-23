import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.server.listen(3333);

    this.server.use(express.json());
    this.server.use('*', cors());
    this.staticfiles();
    this.routes();
  }

  staticfiles() {
    // Gera o arquivo estático para ser acessado no navegador
    this.server.use('/pdf', express.static(resolve(__dirname, 'reports')));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
