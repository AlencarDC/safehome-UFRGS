import { Request, Response } from 'express';

import Controller from './Controller';

import LockFactory from '../services/LockFactory';
import Lock from '../domain/Lock';

class LockController implements Controller {

  public async index(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.query;

    let locks;
    const factory = new LockFactory();

    if (!!id && id !== undefined) {
      locks = await factory.get(id);
    } else {
      locks = await factory.getAll(req.houseId);
    }

    if (locks === null) {
      return res.status(400).json({error: 'Unable to get the locks form this house.'});
    }

    return res.json({locks});
  }

  public async store(req: Request, res: Response): Promise<Response> {

    const { name, status, turnOnTime, turnOffTime } = req.body;

    const factory = new LockFactory();
    const lock: Lock = <Lock> await factory.add(name, status, req.houseId, turnOnTime, turnOffTime);

    if (lock === null) {
      return res.status(400).json({error: 'Unable to create a new lock.'});
    }

    return res.json(lock);
  }

  public async update(req: Request, res: Response): Promise<Response> {

    const {lockId, name, status, turnOnTime, turnOffTime} = req.body;

    const factory = new LockFactory();
    const lock: Lock = <Lock> await factory.update(name, status, req.houseId, turnOnTime, turnOffTime, lockId);

    if (lock === null) {
      return res.status(400).json({error: 'Unable to update the lock.'});
    }

    return res.json(lock);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {lockId} = req.params;

    const factory = new LockFactory();
    const deleted: boolean = await factory.delete(lockId);

    if (!deleted) {
      return res.status(400).json({error: 'Unable to delete the lock.'});
    }

    return res.json({success: "Deleted"});
  }
}

export default LockController;