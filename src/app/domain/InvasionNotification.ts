import Notification from './Notification';
import NotificationType from './NotificationType';

class InvasionNotification extends Notification {
  constructor(deviceName: string, falseAlert: boolean, read: boolean) {
    const title = InvasionNotification.createTitle();
    const message = InvasionNotification.createMessage(deviceName);
    super(NotificationType.INVASION, title, message, falseAlert, read);
  }

  private static createTitle(): string {
    return 'Invasion detected!';
  }

  private static createMessage(deviceName): string {
    return `An invasion has been detected on "${deviceName}". Run away and take care.`;
  }
}

export default InvasionNotification;