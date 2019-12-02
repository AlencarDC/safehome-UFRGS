import { Request, Response } from 'express';

import Controller from './Controller';

import User from '../domain/User';
import House from 'app/domain/House';
import UsersService from '../services/UsersService';
import HouseService from '../services/HouseService';

class HouseController implements Controller {
  public async index(req: Request, res:Response): Promise<Response> {
    const house: House = await HouseService.getHouseByUserId(req.userId);

    if (house === null) {
      return res.status(400).json({error: 'Not able to get any house.'});
    }

    return res.json(house);
  }

  public async update(req: Request, res:Response): Promise<Response> {
    const {address, time} = req.body;

    const house = await HouseService.updateAddress(req.houseId, address);
    if (!!house) {
      await HouseService.updateDevices(req.houseId, time);
      return res.json(house);
    }

    return res.status(400).json({error: "Unable to update"});
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

  public async delete(req: Request, res: Response): Promise<Response> { return res.status(404).json() }
}

export default HouseController;