import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import IUserAdapter from '../data/user/IUserAdapter';
import UserAdapter from '../data/user/UserAdapter';

import User from '../domain/User';

class UsersService {

  private userAdapter : IUserAdapter;

  constructor (userAdapter : IUserAdapter) {
    this.userAdapter = userAdapter;
  }

  public async getUser(userId: string): Promise<User> {
    const user: User = await this.userAdapter.getUserById(userId);

    return user;
  }

  public async getUsersByAdmin(userId: string): Promise<User[]> {
    const checkUser = await this.userAdapter.getUserById(userId);

    if (checkUser.isAdmin()) {
      const users: User[] = await this.userAdapter.findAllUsersByAdmin(checkUser);

      return users;
    }

    return null;
  }

  public async addNewUser(name: string, username: string, password: string, admin:boolean, houseId: string, locks?: boolean, eletrics?: boolean): Promise<User> {

    const newUser = new User(name, username, password, admin, houseId, locks, eletrics);
    
    if (newUser.validate() === false) {
      return null;
    }

    const user = await this.userAdapter.save(newUser);

    return user;
  }

  public async updatePermissions(userId: string, houseId: string, canManageLocks: boolean, canManageEletricDevices: boolean): Promise<User> {
    const user: User = await this.userAdapter.getUserById(userId);

    if (user.isFromHouse(houseId)) {
      user.setManageLocksPermission(canManageLocks);
      user.setManageEletricDevicesPermission(canManageEletricDevices);
      
      const dbUser = await this.userAdapter.update(user);

      return dbUser;
    }

    return null;
  }

  public async deleteUser(userId: string, houseId: string) {
    const user: User = await this.userAdapter.getUserById(userId);
  
    if (user && user.isFromHouse(houseId)) {
      return await this.userAdapter.delete(user);
    }

    return false;
  }

  public async signIn(username: string, password: string): Promise<any> {

    const user: User = await this.userAdapter.getUserByUsername(username);

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

  public async setToken(userId: string, token: string): Promise<boolean> {
    const user: User = await this.userAdapter.getUserById(userId);
    user.setToken(token);
    const response = await this.userAdapter.update(user);

    return !!response;
  }
}

export default new UsersService(new UserAdapter());