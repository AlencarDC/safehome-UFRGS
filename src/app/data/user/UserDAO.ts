import IUserDAO from './IUserDAO';
import UserMapper from './UserMapper';

import UserModelSequelize from '../../../database/models/User';

import User from '../../models/User';

class UserDAO implements IUserDAO {

  public async exists(user: User): Promise<boolean> {;
    const result = await UserModelSequelize.findOne({
      where: { username: user.getUsername() },
    });

    return !!result === true;
  }

  public async delete(user: User): Promise<any> {}

  public async save(user: User): Promise<any> {
    const exists = await this.exists(user);
    const rawUser = UserMapper.toPersistence(user);

    if (exists) {
      return null;
    }

    const dbUser = await UserModelSequelize.create(rawUser);

    return UserMapper.toDomain(dbUser);
  }
  
  public async getUserById(userId: string): Promise<User> {return null}

  public async getUserByUsername(username: string): Promise<User> {
    const result = await UserModelSequelize.findOne({
      where: { username: username },
    });

    return UserMapper.toDomain(result);
  }

  public async findAllUsersByAdminId(adminId: string): Promise<User[]> { return null }
}

export default UserDAO;