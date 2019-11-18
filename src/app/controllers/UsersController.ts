import { Request, Response } from 'express';

import User from '../models/User';
import UsersService from '../services/UsersService';

class UsersController {
  public async store(req: Request, res: Response): Promise<Response> {

    const {name, username, password} = req.body;

    const isAdmin = false;
    const user: User = await UsersService.addNewUser(name, username, password, isAdmin, req.houseId);

    if (user === null) {
      return res.status(400).json({error: 'Not able to create a new user.'});
    }

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({error: "Hey there " + req.userId});
  }
}

export default UsersController;