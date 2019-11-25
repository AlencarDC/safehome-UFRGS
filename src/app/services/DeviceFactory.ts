import SmartDevice from '../models/SmartDevice'
import DAO from 'app/data/DAO';

abstract class DeviceFactory {
  public abstract createDAO(): DAO<SmartDevice>;
  public abstract createDevice(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string): SmartDevice;

  public async add(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string): Promise<SmartDevice> {
    const dao = this.createDAO();
    const device: SmartDevice = this.createDevice(name, status, houseId, turnOnTime, turnOffTime);

    if (device.validate() === false) {
      return null;
    }

    const dbDevice = await dao.save(device);

    return dbDevice;
  }

  public async update(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id: string): Promise<SmartDevice> {
    const dao = this.createDAO();
    const device: SmartDevice = this.createDevice(name, status, houseId, turnOnTime, turnOffTime, id);

    if (device.validate() === false) {
      return null;
    }

    const dbDevice = await dao.update(device);

    return dbDevice;
  }

  public async delete(id: string): Promise<boolean> {
    const dao = this.createDAO();

    const d: SmartDevice = await dao.getById(id);

    if (d) {
      const device: SmartDevice = this.createDevice(d.getName(), d.isON(), d.getHouse(), d.getTurnOnTime(), d.getTurnOffTime(), id);

      const deleted = await dao.delete(device);

      return deleted;
    }

    return false;
  }
}

export default DeviceFactory;