import { Request, Response } from 'express';

import User from '../models/User';
import UsersService from '../services/UsersService';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {

    const {username, password} = req.body;

    const user: User = await UsersService.signIn(username, password);

    if (user === null) {
      return res.status(400).json({error: 'You have entered an invalid username or password.'});
    }

    return res.json(user);
  }
}

export default SessionController;