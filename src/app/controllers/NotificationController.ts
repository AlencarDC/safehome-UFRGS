import { Request, Response } from 'express';

import NotificationService from '../services/NotificationService';
import Notification from '../models/Notification';

class NotificationController {

  public async store(req: Request, res: Response): Promise<Response> {

    const { type, houseId, deviceId } = req.body;

    const notification: Notification = await NotificationService.sendNotification(type, houseId, deviceId);

    if (notification === null) {
      return res.status(400).json({error: 'Unable to send notification.'});
    }

    return res.json(notification);
  }

  /*public async update(req: Request, res: Response): Promise<Response> {

    const {lockId, name, status, turnOnTime, turnOffTime} = req.body;

    const factory = new LockFactory();
    const lock: Lock = <Lock> await factory.update(name, status, req.houseId, turnOnTime, turnOffTime, lockId);

    if (lock === null) {
      return res.status(400).json({error: 'Unable to update the lock.'});
    }

    return res.json(lock);
  }*/
}

export default NotificationController;