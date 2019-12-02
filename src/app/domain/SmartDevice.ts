import {isAfter, isBefore} from 'date-fns';

abstract class SmartDevice {
  private id?: string;
  private name: string;
  private status: boolean;
  private houseId: string;
  private turnOnTime: string;
  private turnOffTime: string;

  constructor (name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string) {
    this.id = id ? id : null;
    this.name = name;
    this.status = status;
    this.houseId = houseId;
    this.turnOnTime = turnOnTime;
    this.turnOffTime = turnOffTime;
  }

  public getId(): string {
    return this.id;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }

  public turnON(): void {
    this.status = true;
  }

  public turnOFF(): void {
    this.status = false;
  }

  public isON(): boolean {
    return this.status;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getHouse(): string {
    return this.houseId;
  }

  public isFromHouse(houseId: string): boolean {
    return this.houseId === houseId;
  }

  public getTurnOnTime(): string {
    return this.turnOnTime;
  }

  public getTurnOffTime(): string {
    return this.turnOffTime;
  }

  public updateStatusByTime(time: string): void {
    const turnOn: Date = this.getDate(this.turnOnTime);
    const turnOff: Date = this.getDate(this.turnOffTime);
    const currentTime: Date = this.getDate(time);

    if (isBefore(turnOff, turnOn)) {
      turnOff.setDate(turnOff.getDate() + 1);
    }

    if (isBefore(currentTime, turnOn)) {
      currentTime.setDate(currentTime.getDate() + 1);
    }

    if (isAfter(currentTime, turnOn) && isBefore(currentTime, turnOff)) {
      this.turnON();
    } else {
      this.turnOFF();
    }
  }

  private getDate(time: string): Date {
    const splitted: string[] = time.split(':');
    return new Date(1999, 3, 9, Number.parseInt(splitted[0]), Number.parseInt(splitted[1]), 0, 0);
  } 

  public validate(): boolean {
    const minNameLength = 3;

    const isNameValid = !!this.name && this.name.length > minNameLength; 

    return isNameValid;
  }
}

export default SmartDevice;