import IHouseDAO from './IHouseDAO';
import HouseMapper from './HouseMapper';

import HouseModelSequelize from '../../../database/models/House';

import House from '../../models/House';

class HouseDAO implements IHouseDAO {

  public async exists(house: House): Promise<boolean> {;
    const result = await HouseModelSequelize.findOne({
      where: { id: house.getId() },
    });

    return !!result === true;
  }

  public async delete(house: House): Promise<boolean> { return false; }

  public async save(house: House): Promise<House> {
    const exists = await this.exists(house);
    const rawUser = HouseMapper.toPersistence(house);

    if (exists) {
      return null;
    }

    const dbUser = await HouseModelSequelize.create(rawUser);

    return HouseMapper.toDomain(dbUser);
  
  }

  public async update(house: House): Promise<House> { return null }

  public async getById(houseId: string): Promise<House> { return null }
  
  public async getHouseById(houseId: string): Promise<House> {return null}
}

export default HouseDAO;