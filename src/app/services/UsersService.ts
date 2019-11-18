import * as Yup from 'yup';
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

  public async addNewUser(name: string, username: string, password: string, admin:boolean, houseId: string): Promise<User> {
    const newUser = new User(name, username, password, admin, houseId);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean().required(),
      houseId: Yup.string().required(),
    });
    
    if (!(await schema.isValid({...newUser}))) {
      return null;
    }
    
    const user = await this.userDAO.save(newUser);

    return user;
  }

  public async signIn(username: string, password: string): Promise<any> {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid({username, password}))) {
      return null;
    }

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