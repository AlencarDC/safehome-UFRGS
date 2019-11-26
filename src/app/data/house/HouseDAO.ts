import IHouseDAO from './IHouseDAO';
import HouseMapper from './HouseMapper';

import HouseModelSequelize from '../../../database/models/House';
import UserModelSequelize from '../../../database/models/User';

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
    const rawHouse = HouseMapper.toPersistence(house);
    
    if (exists) {
      return null;
    }

    const dbUser = await HouseModelSequelize.create(rawHouse);

    return HouseMapper.toDomain(dbUser);
  }

  public async update(house: House): Promise<House> {
    const updatedRows = await HouseModelSequelize.update(HouseMapper.toPersistence(house), { 
      where: { id: house.getId() }, 
    });

    return (updatedRows[0] > 0 ? HouseMapper.toDomain(house) : null);
  }

  public async getById(houseId: string): Promise<House> { 
    const result = await HouseModelSequelize.findOne({
      where: { id: houseId },
    });

    return HouseMapper.toDomain(result);
   }
  
  public async getHouseById(houseId: string): Promise<House> {
    return await this.getById(houseId);
  }

  public async getHouseByUserId(userId: string): Promise<House> {
    const result = await HouseModelSequelize.findOne({
      include: [{
        model: UserModelSequelize,
        where: { id: userId }
      }]
    });

    return HouseMapper.toDomain(result);
  }
}

export default HouseDAO;