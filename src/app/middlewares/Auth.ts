import { Response, Request, NextFunction } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class Auth {
  public async auth(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({error: "Token not provided."})
    }

    // Descarta a primeira posição onde há a chave "Bearer"
    const [, token] = authHeader.split(' ');
    try {
      const jwtVerifyFunction = promisify<string, string, any>(jwt.verify);

      const decoded = await jwtVerifyFunction(token, authConfig.secret);

      // Gravando o id do usuário contido no token disponivel no escopo da requisição
      req.userId = decoded.userId;
      req.houseId = decoded.houseId;
      req.isAdmin = decoded.isAdmin;

      return next();
    } catch (err) {
      return res.status(401).json({ error: "Token invalid"});
    }
  }

  public async adminPermission(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req.isAdmin) {
      return res.status(404).json({ error: "Page not found."});
    }

    return next();
  }
}

export default new Auth();