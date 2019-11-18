import 'dotenv/config'; 
import express from 'express';

import Database from './database/Database';
import Routes from './Routes';

class App {
  public express: express.Application;
  private database: Database;
  private apiRoutes: Routes;

  public constructor() {
    this.express = express();
    this.database = new Database();
    this.apiRoutes = new Routes();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(this.apiRoutes.getRoutes());
  }
}

export default new App().express;
