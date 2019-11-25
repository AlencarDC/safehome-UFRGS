// Conexao com banco de dados e carregar os models
import { Sequelize, Options } from 'sequelize';

import UserModel from './models/User';
import HouseModel from './models/House';
import LockModel from './models/Lock';
import EletricDeviceModel from './models/EletricDevice';
import UserNotificationModel from './models/UserNotification';
import NotificationModel from './models/Notification';

import databaseConfig from '../config/database';

const models = [UserModel, HouseModel, LockModel, EletricDeviceModel, UserNotificationModel, NotificationModel];

class Database {

  private connection: Sequelize;

  constructor() {
    this.init();
  }

  private init(): void {
    this.connection = new Sequelize(databaseConfig as Options);
    
    models
      .map(model => model.initialize(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default Database;
