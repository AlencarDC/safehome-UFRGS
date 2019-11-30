import { Request, Response } from 'express';

import EletricDeviceFactory from '../services/EletricDeviceFactory';
import EletricDevice from '../models/EletricDevice';

class EletricDeviceController {

  public async index(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.query;

    let eletricDevices;
    const factory = new EletricDeviceFactory();

    if (!!id && id !== undefined) {
      eletricDevices = await factory.get(id);
    } else {
      eletricDevices = await factory.getAll(req.houseId);
    }

    if (eletricDevices === null) {
      return res.status(400).json({error: 'Unable to get the eletric devices form this house.'});
    }

    return res.json({eletricDevices});
  }

  public async store(req: Request, res: Response): Promise<Response> {

    const { name, status, turnOnTime, turnOffTime } = req.body;

    const factory = new EletricDeviceFactory();
    const eletricDevice: EletricDevice = <EletricDevice> await factory.add(name, status, req.houseId, turnOnTime, turnOffTime);

    if (eletricDevice === null) {
      return res.status(400).json({error: 'Unable to create a new eletric device.'});
    }

    return res.json(eletricDevice);
  }

  public async update(req: Request, res: Response): Promise<Response> {

    const {eletricDeviceId, name, status, turnOnTime, turnOffTime} = req.body;

    const factory = new EletricDeviceFactory();
    const eletricDevice: EletricDevice = <EletricDevice> await factory.update(name, status, req.houseId, turnOnTime, turnOffTime, eletricDeviceId);

    if (eletricDevice === null) {
      return res.status(400).json({error: 'Unable to update the eletric device.'});
    }

    return res.json(eletricDevice);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { eletricDeviceId } = req.params;

    const factory = new EletricDeviceFactory();
    const deleted: boolean = await factory.delete(eletricDeviceId);

    if (!deleted) {
      return res.status(400).json({error: 'Unable to delete the eletric device.'});
    }

    return res.json({success: "Deleted"});
  }
}

export default EletricDeviceController;