import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import IUserDAO from '../data/user/IUserDAO';
import UserDAO from '../data/user/UserDAO';

import User from '../models/User';

class UsersService {

  private userDAO : IUserDAO;

  constructor (userDAO : IUserDAO) {
    this.userDAO = userDAO;
  }

  public async getUsersByAdmin(userId: string): Promise<User[]> {
    const checkUser = await this.userDAO.getUserById(userId);

    if (checkUser.isAdmin()) {
      const users: User[] = await this.userDAO.findAllUsersByAdminId(checkUser.getId());

      return users;
    }

    return null;
  }

  public async addNewUser(name: string, username: string, password: string, admin:boolean, houseId: string, locks?: boolean, eletrics?: boolean): Promise<User> {

    const newUser = new User(name, username, password, admin, houseId, locks, eletrics);
    
    if (newUser.validate() === false) {
      return null;
    }

    const user = await this.userDAO.save(newUser);

    return user;
  }

  public async updatePermissions(userId: string, houseId: string, canManageLocks: boolean, canManageEletricDevices: boolean): Promise<User> {
    const user: User = await this.userDAO.getUserById(userId);

    if (user.isFromHouse(houseId)) {
      user.setManageLocksPermission(canManageLocks);
      user.setManageLocksPermission(canManageEletricDevices);

      const updatedUser = await this.userDAO.update(user);

      return updatedUser;
    }

    return null;
  }

  public async deleteUser(userId: string, houseId: string) {
    const user: User = await this.userDAO.getUserById(userId);

    if (user.isFromHouse(houseId)) {
      return this.userDAO.delete(user);
    }

    return false;
  }

  public async signIn(username: string, password: string): Promise<any> {

    const user: User = await this.userDAO.getUserByUsername(username);

    if (!user || user.checkPassword(password) === false) {
      return null;
    }

    const userId = user.getId();
    const houseId = user.getHouse();
    const isAdmin = user.isAdmin();

    return ({
      user: user,
      token: jwt.sign({ userId, houseId, isAdmin }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });

  }
}

export default new UsersService(new UserDAO());