import EventListener from './EventListener';
import SmartDevice from './SmartDevice';

class Lock extends SmartDevice implements EventListener {

  constructor (name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string) {
    super(name, status, houseId, turnOnTime, turnOffTime, id ? id : null);
  }

  public update(newStatus: boolean): void {
    newStatus ? this.turnON() : this.turnOFF();
  }

}

export default Lock;