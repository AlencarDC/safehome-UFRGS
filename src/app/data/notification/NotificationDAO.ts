import INotificationDAO from './INotificationDAO';
import NotificationMapper from './NotificationMapper';

import UserModelSequelize from '../../../database/models/User';
import NotificationModelSequelize from '../../../database/models/Notification';
import UserNotificationModelSequelize from '../../../database/models/UserNotification';

import Notification from '../../models/Notification';
import User from '../../models/User';

class NotificationDAO implements INotificationDAO {

  public async exists(notification: Notification): Promise<boolean> {;
    const result = await NotificationModelSequelize.findOne({
      where: { id: notification.getId() },
    });

    return !!result === true;
  }

  public async delete(notification: Notification): Promise<boolean> { return false; }

  public async save(notification: Notification): Promise<Notification> {
    const rawNotification = NotificationMapper.toPersistence(notification);

    const dbNotification = await NotificationModelSequelize.create(rawNotification);

    return NotificationMapper.toDomain(dbNotification);
  }

  public async update(notification: Notification): Promise<Notification> {
    const updatedRows = await NotificationModelSequelize.update(NotificationMapper.toPersistence(notification), { 
      where: { id: notification.getId() }, 
    });

    return (updatedRows[0] > 0 ? NotificationMapper.toDomain(notification) : null);
  }

  public async updateAsRead(notificationId: string, userId: string): Promise<boolean> {
    const updatedRows = await UserNotificationModelSequelize.update({ read: true }, {
      where: {
        notificationId: notificationId,
        userId: userId,
      }
    });

    return updatedRows[0] > 0;
  }

  public async completeUpdate(notification: Notification, userId: string): Promise<Notification> {
    this.update(notification);
    if (notification.isRead()) {
      this.updateAsRead(notification.getId(), userId);
    }

    return notification;
  }

  public async getById(notificationId: string): Promise<Notification> { return null; }
  
  public async getNotificationById(notificationId: string, userId: string): Promise<Notification> {
    const result = await NotificationModelSequelize.findOne({
      where: { id: notificationId },
      include: [{
        model: UserModelSequelize,
        as: 'users',
        attributes: ['id'],
        where: { id: userId },
        through: {
          attributes: ['read'],
          where: {
            notificationId: notificationId,
            userId: userId,
          }
        }
      }]
    });
    return NotificationMapper.toDomain(result);
  }

  public async findAllNotificationsByUserId(userId: string): Promise<Notification[]> {
    const result = await NotificationModelSequelize.findAll({
      include: [{
        model: UserModelSequelize,
        as: 'users',
        where: { id: userId },
        through: {
          attributes: ['read'],
        }
      }]
    });

    const notifications: Notification[] = result.map(notification => NotificationMapper.toDomain(notification));

    return notifications;
  }

  public async saveForAll(notification: Notification, receivers: User[]): Promise<Notification> {
    const savedNotification = await this.save(notification);

    receivers.forEach(async receiver => {
      await UserNotificationModelSequelize.create({
        notificationId: savedNotification.getId(),
        userId: receiver.getId(),
        read: false,
      });
    })
    
    return savedNotification;
  }
}

export default NotificationDAO;