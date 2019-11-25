import Notification from '../../models/Notification';

class NotificationMapper {
  public static toDomain(raw: any): Notification {
    if (!raw) {
      return null;
    }
    const valid: boolean = raw.users && raw.users[0] && raw.users[0].UserNotification;
    const read: boolean = valid ? raw.users[0].UserNotification.read : false;
    return new Notification(raw.type, raw.title, raw.message, raw.falseAlert, read, raw.id);
  }

  public static toPersistence(notification: Notification): any {
    return {
      type: notification.getType(),
      title: notification.getTitle(),
      message: notification.getMessage(),
      falseAlert: notification.isFalseAlert(),
    }
  }
}

export default NotificationMapper;