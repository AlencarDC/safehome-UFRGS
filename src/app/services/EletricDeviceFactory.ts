import DeviceFactory from './DeviceFactory';

import EletricDeviceDAO from '../data/eletricdevice/EletricDeviceDAO';
import EletricDevice from '../models/EletricDevice';

class EletricDeviceFactory extends DeviceFactory {
  public createDAO(): EletricDeviceDAO {
    return new EletricDeviceDAO();
  }

  public createDevice(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string): EletricDevice {
    return new EletricDevice(name, status, houseId, turnOnTime, turnOffTime, id);
  }
}

export default EletricDeviceFactory;