import Expo from 'expo-server-sdk';

import INotificationAdapter from '../data/notification/INotificationAdapter';
import ILockAdapter from '../data/lock/ILockAdapter';
import IUserAdapter from '../data/user/IUserAdapter';

import NotificationAdapter from '../data/notification/NotificationAdapter';
import LockAdapter from '../data/lock/LockAdapter';
import UserAdapter from '../data/user/UserAdapter';

import SmartDevice from '../domain/SmartDevice';

import User from '../domain/User';

import Notification from '../domain/Notification';
import NotificationType from '../domain/NotificationType';
import InvasionNotification from '../domain/InvasionNotification';
import MovementNotification from '../domain/MovementNotification';
import FireNotification from '../domain/FireNotification';

class NotificationService {
  private lockAdapter: ILockAdapter;
  private userAdapter: IUserAdapter;
  private notificationAdapter: INotificationAdapter;

  constructor (lockAdapter: ILockAdapter, userAdapter: IUserAdapter, notificationAdapter: INotificationAdapter) {
    this.lockAdapter = lockAdapter;
    this.userAdapter = userAdapter;
    this.notificationAdapter = notificationAdapter;
  }

  public async getAll(userId: string): Promise<Notification[]> {
    const notifications = this.notificationAdapter.findAllNotificationsByUserId(userId);

    return notifications;
  }

  private async buildNotification(type: NotificationType, deviceId?: string): Promise<Notification> {
    let notification: Notification = null;

    if (type === NotificationType.INVASION && deviceId) {
      const device: SmartDevice = await this.lockAdapter.getLockById(deviceId);
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
      const receiversList: User[] = await this.userAdapter.findAllUsersByHouseId(houseId);

      const savedNotification = await this.notificationAdapter.saveForAll(notification, receiversList);

      await this.sendPushNotification(notification, receiversList);

      return savedNotification;
    }

    return null;
  }

  private async sendPushNotification(notification: Notification, receiversList: User[]): Promise<void> {
    let expo = new Expo();

    let messages = [];
    receiversList.forEach((user) => {
      if (user.getToken() !== null && Expo.isExpoPushToken(user.getToken())) {
        messages.push({
          to: user.getToken(),
          sound: 'default',
          title: notification.getTitle(),
          body: notification.getMessage(),
        })
      }
    });
    let chunks = expo.chunkPushNotifications(messages);
    chunks.forEach(async (chunk)=> {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    });
  };

  public async updateStatus(notificationId: string, userId: string, falseAlert: boolean, read: boolean): Promise<Notification> {
    const notification = await this.notificationAdapter.getNotificationById(notificationId, userId);

    if (notification) {
      if (read) {
        notification.setAsRead();
      }
  
      if (falseAlert) {
        notification.setAsFalseAlert();
        notification.setAsRead();
      }
  
      const updated = await this.notificationAdapter.completeUpdate(notification, userId);
      return updated;
    }
    
    return null
  }  
}

export default new NotificationService(new LockAdapter(), new UserAdapter(), new NotificationAdapter());