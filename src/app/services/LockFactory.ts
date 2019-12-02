import DeviceFactory from './DeviceFactory';

import LockAdapter from '../data/lock/LockAdapter';
import Lock from '../domain/Lock';

class LockFactory extends DeviceFactory {
  public createAdapter(): LockAdapter {
    return new LockAdapter();
  }

  public createDevice(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string): Lock {
    return new Lock(name, status, houseId, turnOnTime, turnOffTime, id);
  }
}

export default LockFactory;