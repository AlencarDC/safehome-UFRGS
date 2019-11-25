import { Router } from 'express';

import AuthMiddleware from './app/middlewares/Auth';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import HouseController from './app/controllers/HouseController';
import LockController from './app/controllers/LockController';
import EletricDeviceController from './app/controllers/EletricDeviceController';

class Routes {
  private router: any;
  private usersController : UsersController;
  private sessionController: SessionController;
  private houseController: HouseController;
  private lockController: LockController;
  private eletricDeviceController: EletricDeviceController;
  
  constructor() {
    this.router = Router();

    this.usersController = new UsersController();
    this.sessionController = new SessionController();
    this.houseController = new HouseController();
    this.lockController = new LockController();
    this.eletricDeviceController = new EletricDeviceController();

    
    this.registerRoutes();
  }

  private registerRoutes(): void {

    this.router.post('/session', this.sessionController.store); // sign in

    this.router.post('/house', this.houseController.store);  // sign up

    this.router.use(AuthMiddleware.auth); // A partir daqui, é necessario estar logado para acessar as rotas

    this.router.post('/locks', AuthMiddleware.checkLockPermission, this.lockController.store);
    this.router.put('/locks', AuthMiddleware.checkLockPermission, this.lockController.update);
    this.router.delete('/locks', AuthMiddleware.checkLockPermission, this.lockController.delete);

    this.router.post('/eletric_devices', AuthMiddleware.checkEletricDevicePermission, this.eletricDeviceController.store);
    this.router.put('/eletric_devices', AuthMiddleware.checkEletricDevicePermission, this.eletricDeviceController.update);
    this.router.delete('/eletric_devices', AuthMiddleware.checkEletricDevicePermission, this.eletricDeviceController.delete);

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
