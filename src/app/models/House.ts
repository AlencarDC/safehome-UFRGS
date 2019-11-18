import User from './User';

class House {
  private camerasStatus: boolean;
  private alarmStatus: boolean;
  private address: string;
  private id?: string;
  private users: User[];

  public constructor(camerasStatus: boolean, alarmStatus: boolean, address: string, id?: string) {
    this.id = id ? id : null;
    this.camerasStatus = camerasStatus;
    this.alarmStatus = alarmStatus;
    this.address = address;
  }

  public getId(): string {
    return this.id;
  }

  public isCamerasON(): boolean {
    return this.camerasStatus;
  }

  public isAlarmON(): boolean {
    return this.alarmStatus;
  }

  public getAddress() {
    return this.address;
  }

  public setUsers(users: User[]): void {
    this.users = users;
  }
}

export default House;