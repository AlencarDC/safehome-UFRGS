import IHouseDAO from '../data/house/IHouseDAO';
import HouseDAO from '../data/house/HouseDAO';

import House from '../models/House';
import Lock from '../models/Lock';

class HouseService {

  private houseDAO : IHouseDAO;

  constructor (houseDAO : IHouseDAO) {
    this.houseDAO = houseDAO;
  }

  public async createNewHouse(address: string): Promise<House> {
    const newHouse: House = new House(false, false, address);

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

    house = await this.houseDAO.save(house);

    return house;
  }

}

export default new HouseService(new HouseDAO());