import DAO from '../DAO';
import Notification from '../../models/Notification';
import User from '../../models/User';

interface INotificationDAO extends DAO<Notification> {
  getNotificationById(notificationId: string, userId: string): Promise<Notification>;
  findAllNotificationsByUserId(userId: string): Promise<Notification[]>;
  updateAsRead(notificationId: string, userId: string): Promise<boolean>;
  completeUpdate(notification: Notification, userId: string): Promise<Notification>;
  saveForAll(notification: Notification, receivers: User[]): Promise<Notification>;
}

export default INotificationDAO;