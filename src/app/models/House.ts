import Lock from './Lock';
import EletricDevice from './EletricDevice';
import EventManager from './EventManager';

class House {
  private camerasStatus: boolean;
  private alarmStatus: boolean;
  private sprinklersStatus: boolean;
  private address: string;
  private id?: string;
  private locks: Lock[];
  private eletricDevices: EletricDevice[];

  public events: EventManager;

  public constructor(camerasStatus: boolean, alarmStatus: boolean, sprinklersStatus: boolean, address: string, id?: string) {
    this.id = id ? id : null;
    this.camerasStatus = camerasStatus;
    this.alarmStatus = alarmStatus;
    this.sprinklersStatus = sprinklersStatus;
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

  public isSprinklersON(): boolean {
    return this.sprinklersStatus;
  }

  public setSprinklersStatus(status: boolean): void {
    this.sprinklersStatus = status;
  }

  public getAddress() {
    return this.address;
  }

  public getLocks(): Lock[] {
    return this.locks;
  }

  public setLocks(locks: Lock[]): void {
    this.locks = locks;
  }

  public addLock(lock: Lock): void {
    this.locks.push(lock);
  }

  public removeLock(lock: Lock): void {
    const index = this.locks.indexOf(lock);
    this.locks.splice(index, 1);
  }

  public getEletricDevices(): EletricDevice[] {
    return this.eletricDevices;
  }

  public setEletricDevices(eletricDevices: EletricDevice[]): void {
    this.eletricDevices = eletricDevices;
  }

  public addEletricDevice(eletricDevice: EletricDevice): void {
    this.eletricDevices.push(eletricDevice);
  }

  public removeEletricDevice(eletricDevice: EletricDevice): void {
    const index = this.eletricDevices.indexOf(eletricDevice);
    this.eletricDevices.splice(index, 1);
  }

  public validate(): boolean {
    const minAddresLength = 6;
    return (!!this.address && this.address.length > minAddresLength);
  }
}

export default House;