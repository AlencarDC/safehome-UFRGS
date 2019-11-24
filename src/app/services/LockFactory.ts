import DeviceFactory from './DeviceFactory';

import LockDAO from '../data/lock/LockDAO';
import Lock from '../models/Lock';

class LockFactory extends DeviceFactory {
  public createDAO(): LockDAO {
    return new LockDAO();
  }

  public createDevice(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string): Lock {
    return new Lock(name, status, houseId, turnOnTime, turnOffTime, id);
  }
}

export default LockFactory;