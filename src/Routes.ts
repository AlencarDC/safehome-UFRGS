import { Router } from 'express';

import AuthMiddleware from './app/middlewares/Auth';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import HouseController from './app/controllers/HouseController';

class Routes {
  private router: any;
  private usersController : UsersController;
  private sessionController: SessionController;
  private houseController: HouseController;
  
  constructor() {
    this.router = Router();

    this.usersController = new UsersController();
    this.sessionController = new SessionController();
    this.houseController = new HouseController();

    
    this.registerRoutes();
  }

  private registerRoutes(): void {

    this.router.post('/session', this.sessionController.store); // sign in

    this.router.post('/house', this.houseController.store);  // sign up

    this.router.use(AuthMiddleware.auth); // A partir daqui, é necessario estar logado para acessar as rotas



    // Admin exlusive routes
    this.router.use(AuthMiddleware.adminPermission);

    this.router.get('/users', this.usersController.index);
    this.router.post('/users', this.usersController.store);
    this.router.put('/users', this.usersController.update);
    this.router.delete('/users', this.usersController.delete);
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default Routes;
