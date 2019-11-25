import INotificationDAO from '../data/notification/INotificationDAO';
import ILockDAO from '../data/lock/ILockDAO';
import IUserDAO from '../data/user/IUserDAO';

import NotificationDAO from '../data/notification/NotificationDAO';
import LockDAO from '../data/lock/LockDAO';
import UserDAO from '../data/user/UserDAO';

import SmartDevice from '../models/SmartDevice';

import User from '../models/User';

import Notification from '../models/Notification';
import NotificationType from '../models/NotificationType';
import InvasionNotification from '../models/InvasionNotification';
import MovementNotification from '../models/MovementNotification';
import FireNotification from '../models/FireNotification';

class NotificationService {
  private lockDAO: ILockDAO;
  private userDAO: IUserDAO;
  private notificationDAO: INotificationDAO;

  constructor (lockDAO: ILockDAO, userDAO: IUserDAO, notificationDAO: INotificationDAO) {
    this.lockDAO = lockDAO;
    this.userDAO = userDAO;
    this.notificationDAO = notificationDAO;
  }

  public async getAll(userId: string): Promise<Notification[]> {
    const notifications = this.notificationDAO.findAllNotificationsByUserId(userId);

    return notifications;
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

  public async sendNotification(type: NotificationType, houseId: string, deviceId?: string): Promise<Notification> {

    const notification: Notification = await this.buildNotification(type, deviceId);

    if (notification) {
      const receiversList: User[] = await this.userDAO.findAllUsersByHouseId(houseId);

      const savedNotification = await this.notificationDAO.saveForAll(notification, receiversList);

      return savedNotification;
    }

    return null;
  }

  public async updateStatus(notificationId: string, userId: string, falseAlert: boolean, read: boolean): Promise<Notification> {
    const notification = await this.notificationDAO.getNotificationById(notificationId, userId);

    if (notification) {
      if (read) {
        notification.setAsRead();
      }
  
      if (falseAlert) {
        notification.setAsFalseAlert();
        notification.setAsRead();
      }
  
      const updated = await this.notificationDAO.completeUpdate(notification, userId);
      return updated;
    }
    
    return null
  }  
}

export default new NotificationService(new LockDAO(), new UserDAO(), new NotificationDAO());