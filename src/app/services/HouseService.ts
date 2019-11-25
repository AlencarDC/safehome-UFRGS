import IHouseDAO from '../data/house/IHouseDAO';
import HouseDAO from '../data/house/HouseDAO';
import IUserDAO from '../data/user/IUserDAO';
import UserDAO from '../data/user/UserDAO';

import House from '../models/House'
import User from '../models/User';
import Lock from '../models/Lock';
import DeviceFactory from './DeviceFactory';

class HouseService {

  private houseDAO : IHouseDAO;
  private userDAO : IUserDAO;

  constructor (houseDAO : IHouseDAO, userDAO : IUserDAO) {
    this.houseDAO = houseDAO;
    this.userDAO = userDAO;
  }

  public async createNewHouse(address: string): Promise<House> {
    const newHouse: House = new House(false, false, false, address);

    if (newHouse.validate() === false) {
      return null;
    }

    const house: House = await this.houseDAO.save(newHouse);

    return house;
  }

  public async onFireAlert(houseId: string): Promise<House> {
    let house: House = await this.houseDAO.getHouseById(houseId);

    const locks: Lock[] = house.getLocks();

    locks.forEach(lock => house.events.subscribe("on_fire_alert", lock));

    const turnOFF = true;
    house.events.notify("on_fire_alert", turnOFF);

    house = await this.houseDAO.save(house); // save Locks

    return house;
  }

  public async onInvasionDetected(houseId: string): Promise<House> {
    let house: House = await this.houseDAO.getHouseById(houseId);

    house.setAlarmStatus(true);
    house.setCamerasStatus(true);

    house = await this.houseDAO.save(house);

    return house;
  }

}

export default new HouseService(new HouseDAO(), new UserDAO());