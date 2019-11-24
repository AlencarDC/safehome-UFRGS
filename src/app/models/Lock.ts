import EventListener from './EventListener';
import SmartDevice from './SmartDevice';

class Lock extends SmartDevice implements EventListener {

  constructor (name: string, status: boolean, houseId: string, id?: string) {
    super(name, status, houseId, id ? id : null);
  }

  public update(newStatus: boolean): void {
    newStatus ? this.turnON() : this.turnOFF();
  }

}

export default Lock;