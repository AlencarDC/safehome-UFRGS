import IHouseDAO from '../data/house/IHouseDAO';
import HouseDAO from '../data/house/HouseDAO';
import ILockDAO from '../data/lock/ILockDAO';
import LockDAO from '../data/lock/LockDAO';
import IEletricDeviceDAO from '../data/eletricdevice/IEletricDeviceDAO';
import EletricDeviceDAO from '../data/eletricdevice/EletricDeviceDAO';

import House from '../models/House'
import Lock from '../models/Lock';
import NotificationType from '../models/NotificationType';

class HouseService {

  private houseDAO : IHouseDAO;
  private lockDAO: ILockDAO;
  private eletricDeviceDAO: IEletricDeviceDAO


  constructor (houseDAO : IHouseDAO, lockDAO: ILockDAO, eletricDeviceDAO: IEletricDeviceDAO) {
    this.houseDAO = houseDAO;
    this.lockDAO = lockDAO;
    this.eletricDeviceDAO = eletricDeviceDAO;
  }

  public async createNewHouse(address: string): Promise<House> {
    const newHouse: House = new House(false, false, false, address);
    
    if (newHouse.validate() === false) {
      return null;
    }

    const house: House = await this.houseDAO.save(newHouse);

    return house;
  }

  public async getHouseByUserId(userId: string): Promise<House> {
    const house: House = await this.houseDAO.getHouseByUserId(userId);

    return house;
  }

  public async manageAlert(type: NotificationType, houseId: string, falseAlert: boolean): Promise<void> {

    if (type === NotificationType.INVASION) {
      this.onInvasionDetected(houseId, falseAlert);
    }
    else if (type === NotificationType.MOVEMENT) {
      this.onSuspiciousMovement(houseId, falseAlert);
    }
    else if (type === NotificationType.FIRE) {
      this.onFireAlert(houseId, falseAlert);
    }
  }

  private async onFireAlert(houseId: string, falseAlert: boolean): Promise<House> {
    let house: House = await this.houseDAO.getHouseById(houseId);
    house.setLocks(await this.lockDAO.findAllLocksByHouseId(houseId));

    const locks: Lock[] = house.getLocks();
    locks.forEach(lock => house.events.subscribe("on_fire_alert", lock));

    const newLockStatus: boolean = falseAlert ? true : false;
    house.events.notify("on_fire_alert", newLockStatus);

    locks.forEach(async lock => await this.lockDAO.update(lock));

    const newSprinklerStatus: boolean = falseAlert ? false : true;
    house.setSprinklersStatus(newSprinklerStatus);
    house = await this.houseDAO.update(house);

    return house;
  }

  private async onInvasionDetected(houseId: string, falseAlert: boolean): Promise<House> {
    let house: House = await this.houseDAO.getHouseById(houseId);

    const newStatus: boolean = falseAlert ? false : true;
    house.setAlarmStatus(newStatus);
    house.setCamerasStatus(newStatus);

    house = await this.houseDAO.update(house);

    return house;
  }

  private async onSuspiciousMovement(houseId: string, falseAlert: boolean): Promise<House> {
    let house: House = await this.houseDAO.getHouseById(houseId);

    const newStatus: boolean = falseAlert ? false : true;
    house.setCamerasStatus(newStatus);

    house = await this.houseDAO.update(house);

    return house;
  }

}

export default new HouseService(new HouseDAO(), new LockDAO(), new EletricDeviceDAO());