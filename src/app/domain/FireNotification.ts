import Notification from './Notification';
import NotificationType from './NotificationType';

class FireNotification extends Notification {
  constructor(falseAlert: boolean, read: boolean) {
    const title = FireNotification.createTitle();
    const message = FireNotification.createMessage();
    super(NotificationType.FIRE, title, message, falseAlert, read);
  }

  private static createTitle(): string {
    return 'Fire in the  hole!';
  }

  private static createMessage(): string {
    return `This house is on FIRE! The sprinklers were turned on.`;
  }
}

export default FireNotification;