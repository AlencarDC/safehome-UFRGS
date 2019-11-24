import User from './User';
import Lock from './Lock';
import EventManager from './EventManager';

class House {
  private camerasStatus: boolean;
  private alarmStatus: boolean;
  private address: string;
  private id?: string;
  private locks: Lock[];

  public events: EventManager;

  public constructor(camerasStatus: boolean, alarmStatus: boolean, address: string, id?: string) {
    this.id = id ? id : null;
    this.camerasStatus = camerasStatus;
    this.alarmStatus = alarmStatus;
    this.address = address;

    this.events = new EventManager();
  }

  public getId(): string {
    return this.id;
  }

  public isCamerasON(): boolean {
    return this.camerasStatus;
  }

  public setCamerasStatus(status: boolean): void {
    this.camerasStatus = status;
  }

  public isAlarmON(): boolean {
    return this.alarmStatus;
  }

  public setAlarmStatus(status: boolean): void {
    this.alarmStatus = status;
  }

  public getAddress() {
    return this.address;
  }

  public getLocks(): Lock[] {
    return this.locks;
  }

  public addLock(lock: Lock): void {
    this.locks.push(lock);
  }

  public removeLock(lock: Lock): void {
    const index = this.locks.indexOf(lock);
    this.locks.splice(index, 1);
  }

  public validate(): boolean {
    const minAddresLength = 6;
    return (this.address && this.address.length > minAddresLength);
  }
}

export default House;