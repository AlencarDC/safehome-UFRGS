import NotificationType from './NotificationType';

class Notification {
  public id: string;
  public type: NotificationType;
  public title: string;
  public message: string;
  public falseAlert: boolean;
  public read: boolean;

  constructor (type: NotificationType, title: string, message: string, falseAlert: boolean, read:boolean, id?: string) {
    this.id = id ? id : null;
    this.type = type;
    this.title = title;
    this.message = message;
    this.falseAlert = falseAlert;
    this.read = read;
  }

  public validate(): boolean {
    const minLength = 3;

    const isTitleValid  = !!this.title && this.title.length > minLength;
    const isMessageValid  = !!this.message && this.message.length > minLength;

    return isTitleValid && isMessageValid;
  }

  public getId(): string {
    return this.id;
  }

  public getType(): NotificationType {
    return this.type;
  }

  public getTitle(): string {
    return this.title;
  }

  public getMessage(): string {
    return this.message;
  }

  public isFalseAlert(): boolean {
    return this.falseAlert;
  }

  public setAsFalseAlert(): void {
    this.falseAlert = true;
  }

  public isRead(): boolean {
    return this.read;
  }

  public setAsRead(): void {
    this.read = true;
  }
}

export default Notification;