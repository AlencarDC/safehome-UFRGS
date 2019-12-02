import Notification from './Notification';
import NotificationType from './NotificationType';

class MovementNotification extends Notification {
  constructor(falseAlert: boolean, read: boolean) {
    const title = MovementNotification.createTitle();
    const message = MovementNotification.createMessage();
    super(NotificationType.MOVEMENT, title, message, falseAlert, read);
  }

  private static createTitle(): string {
    return 'Suspicious movements!';
  }

  private static createMessage(): string {
    return `Suspicious movements has been detected around the house. The were turned on.`;
  }
}

export default MovementNotification;