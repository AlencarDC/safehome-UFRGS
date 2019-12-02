import Adapter from '../Adapter';
import User from '../../domain/User';

interface IUserAdapter extends Adapter<User> {
  getUserById(userId: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  findAllUsersByAdmin(admin: User): Promise<User[]>;
  findAllUsersByHouseId(houseId: string): Promise<User[]>;
}

export default IUserAdapter;