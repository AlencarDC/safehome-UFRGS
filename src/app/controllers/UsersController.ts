import { Request, Response } from 'express';

import Controller from './Controller';

import User from '../domain/User';
import UsersService from '../services/UsersService';

class UsersController implements Controller {
  public async index(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.query;

    let users;

    if (!!id && id !== undefined) {
      users = await UsersService.getUser(id);
    } else {
      users = await UsersService.getUsersByAdmin(req.userId);
    }

    if (users === null) {
      return res.status(400).json({error: 'Unable to get the users form this house.'});
    }

    return res.json({users});
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

    const user: User = await UsersService.updatePermissions(userId, req.houseId, manageLocks, manageDevices);

    if (user === null) {
      return res.status(400).json({error: 'Not able to update the user.'});
    }

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    
    const deleted : boolean = await UsersService.deleteUser(userId, req.houseId);

    if (deleted) {
      return res.json({success: "Deleted"});
    }

    return res.status(400).json({ error: 'Unable to delete user.'})
  }

  public async setToken(req: Request, res: Response): Promise<Response>  {
    const { token } = req.body;

    const set = await UsersService.setToken(req.userId, token);

    return res.json(set);
  }
}

export default UsersController;