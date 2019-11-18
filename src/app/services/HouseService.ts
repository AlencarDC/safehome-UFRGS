import * as Yup from 'yup';

import IHouseDAO from '../data/house/IHouseDAO';
import HouseDAO from '../data/house/HouseDAO';

import House from '../models/House';

class HouseService {

  private houseDAO : IHouseDAO;

  constructor (houseDAO : IHouseDAO) {
    this.houseDAO = houseDAO;
  }

  public async createNewHouse(address): Promise<House> {
    const schema = Yup.object().shape({
      address: Yup.string().required().min(6),
    });

    if (!(await schema.isValid({address}))) {
      return null;
    }

    const newHouse: House = new House(false, false, address);

    const house: House = await this.houseDAO.save(newHouse);

    return house;
  }

}

export default new HouseService(new HouseDAO());