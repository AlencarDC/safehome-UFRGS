import DAO from '../DAO';
import House from '../../models/House';

interface IHouseDAO extends DAO<House> {
  getHouseById(houseId: string): Promise<House>;
  getHouseByUserId(userId: string): Promise<House>;
}

export default IHouseDAO;