import { Request, Response } from 'express';

import Controller from './Controller';

import User from '../domain/User';
import UsersService from '../services/UsersService';

class SessionController implements Controller {

  public async index(req: Request, res: Response): Promise<Response> { return res.status(404).json() }

  public async store(req: Request, res: Response): Promise<Response> {

    const {username, password} = req.body;

    const user: User = await UsersService.signIn(username, password);

    if (user === null) {
      return res.status(400).json({error: 'You have entered an invalid username or password.'});
    }

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> { return res.status(404).json() }

  public async delete(req: Request, res: Response): Promise<Response> { return res.status(404).json() }
}

export default SessionController;