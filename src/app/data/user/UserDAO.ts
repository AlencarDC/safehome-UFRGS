import { Op } from 'sequelize'

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

  public async delete(user: User): Promise<boolean> {
    const result = await UserModelSequelize.destroy({ 
      where: { id: user.getId() } 
    });

    return !!result;
  }

  public async save(user: User): Promise<User> {
    const exists = await this.exists(user);
    const rawUser = UserMapper.toPersistence(user);

    if (exists) {
      return null;
    }

    const dbUser = await UserModelSequelize.create(rawUser);

    return UserMapper.toDomain(dbUser);
  }

  public async update(user: User): Promise<User> {
    const updatedRows = await UserModelSequelize.update(UserMapper.toPersistence(user), { 
      where: { id: user.getId() }
    });
    
    return (updatedRows[0] > 0 ? UserMapper.toDomain(user) : null);
  }
  
  public async getUserById(userId: string): Promise<User> {
    const result = await UserModelSequelize.findOne({
      where: { id: userId },
    });

    return UserMapper.toDomain(result);
  }

  public async getUserByUsername(username: string): Promise<User> {
    const result = await UserModelSequelize.findOne({
      where: { username: username },
    });

    return UserMapper.toDomain(result);
  }

  public async findAllUsersByAdminId(adminId: string): Promise<User[]> { 
    const admin: User = await this.getUserById(adminId);

    const result = await UserModelSequelize.findAll({
      where: {
        houseId: admin.getHouse(),
        admin: { [Op.ne]: true },
      } 
    });

    const users: User[] = result.map(user => UserMapper.toDomain(user));

    return users;
  }
}

export default UserDAO;