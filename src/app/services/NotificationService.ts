
import ILockDAO from '../data/lock/ILockDAO';
import IHouseDAO from '../data/house/IHouseDAO';
import IUserDAO from '../data/user/IUserDAO';

import LockDAO from '../data/lock/LockDAO';
import HouseDAO from '../data/house/HouseDAO';
import UserDAO from '../data/user/UserDAO';

import SmartDevice from '../models/SmartDevice';

import Notification from '../models/Notification';
import NotificationType from '../models/NotificationType';
import InvasionNotification from '../models/InvasionNotification';
import MovementNotification from '../models/MovementNotification';
import FireNotification from '../models/FireNotification';

class NotificationService {
  private lockDAO: ILockDAO;
  private houseDAO: IHouseDAO;
  private userDAO: IUserDAO;

  constructor (lockDAO: ILockDAO, houseDAO: IHouseDAO, userDAO: IUserDAO) {
    this.lockDAO = lockDAO;
    this.houseDAO = houseDAO;
    this.userDAO = userDAO;
  }

  public async sendNotification(type: NotificationType, houseId: string, deviceId?: string): Promise<Notification> {

    const notification: Notification = await this.buildNotification(type, deviceId);

    if (notification) {

    }

    return notification;
  }

  private async buildNotification(type: NotificationType, deviceId?: string): Promise<Notification> {
    let notification: Notification = null;

    if (type === NotificationType.INVASION && deviceId) {
      const device: SmartDevice = await this.lockDAO.getLockById(deviceId);
      notification = device ? new InvasionNotification(device.getName(), false, false) : null;
    }
    else if (type === NotificationType.MOVEMENT) {
      notification = new MovementNotification(false, false);
    }
    else if (type === NotificationType.FIRE) {
      notification = new FireNotification(false, false);
    }

    return notification;
  }
}

export default new NotificationService(new LockDAO(), new HouseDAO(), new UserDAO());