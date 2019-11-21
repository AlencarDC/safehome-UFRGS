import { Request, Response } from 'express';

import User from '../models/User';
import UsersService from '../services/UsersService';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    
    const users: User[] = await UsersService.getUsersByAdmin(req.houseId);

    if (users === null) {
      return res.status(400).json({error: 'Unable to get the users form this house.'});
    }

    return res.json(users);
  }

  public async store(req: Request, res: Response): Promise<Response> {

    const {name, username, password, manageLocks, manageDevices} = req.body;

    const isAdmin = false;
    const user: User = await UsersService.addNewUser(name, username, password, isAdmin, req.houseId, manageLocks, manageDevices);

    if (user === null) {
      return res.status(400).json({error: 'Not able to create a new user.'});
    }

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {

    const {userId, manageLocks, manageDevices} = req.body;

    const user: User = await UsersService.updateUser(userId, req.houseId, manageLocks, manageDevices);

    if (user === null) {
      return res.status(400).json({error: 'Not able to update the user.'});
    }

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;

    const deleted : boolean = await UsersService.deleteUser(userId, req.houseId);

    if (deleted) {
      return res.json();
    }

    return res.status(400).json({ error: 'Unable to delete user.'})
  }
}

export default UsersController;