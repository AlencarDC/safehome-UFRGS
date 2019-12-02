import Adapter from '../Adapter';
import House from '../../domain/House';

interface IHouseAdapter extends Adapter<House> {
  getHouseById(houseId: string): Promise<House>;
  getHouseByUserId(userId: string): Promise<House>;
}

export default IHouseAdapter;