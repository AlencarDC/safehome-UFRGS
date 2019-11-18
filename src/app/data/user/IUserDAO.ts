import DAO from '../DAO';
import User from '../../models/User';

interface IUserDAO extends DAO<User> {
  getUserById(userId: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  findAllUsersByAdminId(adminId: string): Promise<User[]>;
}

export default IUserDAO;