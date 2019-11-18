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

  public async delete(house: House): Promise<any> {}

  public async save(house: House): Promise<any> {
    const exists = await this.exists(house);
    const rawUser = HouseMapper.toPersistence(house);

    if (exists) {
      return null;
    }

    const dbUser = await HouseModelSequelize.create(rawUser);

    return HouseMapper.toDomain(dbUser);
  }
  
  public async getHouseById(userId: string): Promise<House> {return null}
}

export default HouseDAO;