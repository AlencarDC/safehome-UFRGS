import IHouseAdapter from '../data/house/IHouseAdapter';
import HouseAdapter from '../data/house/HouseAdapter';
import ILockAdapter from '../data/lock/ILockAdapter';
import LockAdapter from '../data/lock/LockAdapter';
import IEletricDeviceAdapter from '../data/eletricdevice/IEletricDeviceAdapter';
import EletricDeviceAdapter from '../data/eletricdevice/EletricDeviceAdapter';

import House from '../domain/House'
import Lock from '../domain/Lock';
import NotificationType from '../domain/NotificationType';

class HouseService {

  private houseAdapter : IHouseAdapter;
  private lockAdapter: ILockAdapter;
  private eletricDeviceAdapter: IEletricDeviceAdapter


  constructor (houseAdapter : IHouseAdapter, lockAdapter: ILockAdapter, eletricDeviceAdapter: IEletricDeviceAdapter) {
    this.houseAdapter = houseAdapter;
    this.lockAdapter = lockAdapter;
    this.eletricDeviceAdapter = eletricDeviceAdapter;
  }

  public async createNewHouse(address: string): Promise<House> {
    const newHouse: House = new House(false, false, false, address);
    
    if (newHouse.validate() === false) {
      return null;
    }

    const house: House = await this.houseAdapter.save(newHouse);

    return house;
  }

  public async updateAddress(houseId: string ,address: string): Promise<House> {
    let house: House = await this.houseAdapter.getHouseById(houseId);

    if (!!house) {
      house.setAddress(address);
      house = await this.houseAdapter.update(house);

      return house;
    }

    return null;
  }

  public async getHouseByUserId(userId: string): Promise<House> {
    const house: House = await this.houseAdapter.getHouseByUserId(userId);

    return house;
  }

  public async manageAlert(type: NotificationType, houseId: string, falseAlert: boolean): Promise<void> {
    let house: House = await this.houseAdapter.getHouseById(houseId);

    if (type === NotificationType.INVASION) {
      house.onInvasionDetected(falseAlert);
    }
    else if (type === NotificationType.MOVEMENT) {
      house.onSuspiciousMovement(falseAlert);
    }
    else if (type === NotificationType.FIRE) {
      house.setLocks(await this.lockAdapter.findAllLocksByHouseId(houseId));
      house.onFireAlert(falseAlert);
      house.getLocks().forEach(async lock => await this.lockAdapter.update(lock));
    }

    house = await this.houseAdapter.update(house);
  }

  public async updateDevices(houseId: string, time: string): Promise<void> {
    let house: House = await this.houseAdapter.getHouseById(houseId);
    house.setLocks(await this.lockAdapter.findAllLocksByHouseId(houseId));
    house.setEletricDevices(await this.eletricDeviceAdapter.findAllEletricDevicesByHouseId(houseId));

    house.updateDevices(time);

    house.getLocks().forEach(async lock => {
      await this.lockAdapter.update(lock);
    });

    house.getEletricDevices().forEach(async eletricDevice => {
      await this.eletricDeviceAdapter.update(eletricDevice);
    });
  }
}

export default new HouseService(new HouseAdapter(), new LockAdapter(), new EletricDeviceAdapter());