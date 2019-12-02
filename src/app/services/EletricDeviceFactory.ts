import DeviceFactory from './DeviceFactory';

import EletricDeviceAdapter from '../data/eletricdevice/EletricDeviceAdapter';
import EletricDevice from '../domain/EletricDevice';

class EletricDeviceFactory extends DeviceFactory {
  public createAdapter(): EletricDeviceAdapter {
    return new EletricDeviceAdapter();
  }

  public createDevice(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string): EletricDevice {
    return new EletricDevice(name, status, houseId, turnOnTime, turnOffTime, id);
  }
}

export default EletricDeviceFactory;