import { Request, Response } from 'express';

import User from '../models/User';
import House from 'app/models/House';
import UsersService from '../services/UsersService';
import HouseService from '../services/HouseService';

class HouseController {
  public async index(req: Request, res:Response): Promise<Response> {
    const house: House = await HouseService.getHouseByUserId(req.userId);

    if (house === null) {
      return res.status(400).json({error: 'Not able to get any house.'});
    }

    return res.json(house);
  }

  public async store(req: Request, res: Response): Promise<Response> {

    const {name, username, password, address} = req.body;
    
    const house: House = await HouseService.createNewHouse(address);

    if (house === null) {
      return res.status(400).json({error: 'Not able to create a new house.'});
    }

    const isAdmin: boolean = true;
    const user: User = await UsersService.addNewUser(name, username, password, isAdmin, house.getId());

    if (user === null) {
      return res.status(400).json({error: 'Not able to create a new user.'});
    }

    return res.json({user, house});
  }
}

export default HouseController;