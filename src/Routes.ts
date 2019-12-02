import { Router } from 'express';

import AuthMiddleware from './app/middlewares/Auth';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import HouseController from './app/controllers/HouseController';
import LockController from './app/controllers/LockController';
import EletricDeviceController from './app/controllers/EletricDeviceController';
import NotificationController from './app/controllers/NotificationController';

class Routes {
  private router: any;
  private usersController : UsersController;
  private sessionController: SessionController;
  private houseController: HouseController;
  private lockController: LockController;
  private eletricDeviceController: EletricDeviceController;
  private notificationController: NotificationController;
  
  constructor() {
    this.router = Router();

    this.usersController = new UsersController();
    this.sessionController = new SessionController();
    this.houseController = new HouseController();
    this.lockController = new LockController();
    this.eletricDeviceController = new EletricDeviceController();
    this.notificationController = new NotificationController();

    
    this.registerRoutes();
  }

  private registerRoutes(): void {

    this.router.post('/session', this.sessionController.store); // sign in

    this.router.post('/house', this.houseController.store);  // sign up

    this.router.post('/alert', this.notificationController.store);

    /**
     * LOGIN REQUIRED
     */
    this.router.use(AuthMiddleware.auth); // A partir daqui, é necessario estar logado para acessar as rotas

    this.router.get('/house', this.houseController.index);
    this.router.put('/house', this.houseController.update);

    this.router.get('/alert/:userId', this.notificationController.index);
    this.router.put('/alert', this.notificationController.update);

    this.router.get('/locks', this.lockController.index);
    this.router.post('/locks', AuthMiddleware.checkLockPermission, this.lockController.store);
    this.router.put('/locks', AuthMiddleware.checkLockPermission, this.lockController.update);
    this.router.delete('/locks/:lockId', AuthMiddleware.checkLockPermission, this.lockController.delete);

    this.router.get('/eletric_devices', this.eletricDeviceController.index);
    this.router.post('/eletric_devices', AuthMiddleware.checkLockPermission, this.eletricDeviceController.store);
    this.router.put('/eletric_devices', AuthMiddleware.checkEletricDevicePermission, this.eletricDeviceController.update);
    this.router.delete('/eletric_devices/:eletricDeviceId', AuthMiddleware.checkEletricDevicePermission, this.eletricDeviceController.delete);

    this.router.get('/users', this.usersController.index);
    this.router.post('/users/token', this.usersController.setToken);

    /**
     * ADMIN ONLY
     */
    this.router.use(AuthMiddleware.adminPermission);

    this.router.post('/users', this.usersController.store);
    this.router.put('/users', this.usersController.update);
    this.router.delete('/users/:userId', this.usersController.delete);
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default Routes;
