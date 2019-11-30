import DAO from '../DAO';
import User from '../../models/User';

interface IUserDAO extends DAO<User> {
  getUserById(userId: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  findAllUsersByAdmin(admin: User): Promise<User[]>;
  findAllUsersByHouseId(houseId: string): Promise<User[]>;
}

export default IUserDAO;