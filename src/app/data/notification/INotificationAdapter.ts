import Adapter from '../Adapter';
import Notification from '../../domain/Notification';
import User from '../../domain/User';

interface INotificationAdapter extends Adapter<Notification> {
  getNotificationById(notificationId: string, userId: string): Promise<Notification>;
  findAllNotificationsByUserId(userId: string): Promise<Notification[]>;
  updateAsRead(notificationId: string, userId: string): Promise<boolean>;
  completeUpdate(notification: Notification, userId: string): Promise<Notification>;
  saveForAll(notification: Notification, receivers: User[]): Promise<Notification>;
}

export default INotificationAdapter;