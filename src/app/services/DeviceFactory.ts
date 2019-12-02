import SmartDevice from '../domain/SmartDevice'
import Adapter from 'app/data/Adapter';

abstract class DeviceFactory {
  public abstract createAdapter(): Adapter<SmartDevice>;
  public abstract createDevice(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string): SmartDevice;

  public async get(lockId: string) {
    const adapter = this.createAdapter();

    const device: SmartDevice = await adapter.getById(lockId);

    return device;
  }

  public async getAll(houseId: string): Promise<SmartDevice[]> {
    const adapter = this.createAdapter();

    const devices: SmartDevice[] = await adapter.findAll(houseId);

    return devices;
  }

  public async add(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string): Promise<SmartDevice> {
    const adapter = this.createAdapter();
    const device: SmartDevice = this.createDevice(name, status, houseId, turnOnTime, turnOffTime);

    if (device.validate() === false) {
      return null;
    }

    const dbDevice = await adapter.save(device);

    return dbDevice;
  }

  public async update(name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id: string): Promise<SmartDevice> {
    const adapter = this.createAdapter();
    const device: SmartDevice = this.createDevice(name, status, houseId, turnOnTime, turnOffTime, id);

    if (device.validate() === false) {
      return null;
    }

    const dbDevice = await adapter.update(device);

    return dbDevice;
  }

  public async delete(id: string): Promise<boolean> {
    const adapter = this.createAdapter();

    const d: SmartDevice = await adapter.getById(id);

    if (d) {
      const device: SmartDevice = this.createDevice(d.getName(), d.isON(), d.getHouse(), d.getTurnOnTime(), d.getTurnOffTime(), id);

      const deleted = await adapter.delete(device);

      return deleted;
    }

    return false;
  }
}

export default DeviceFactory;