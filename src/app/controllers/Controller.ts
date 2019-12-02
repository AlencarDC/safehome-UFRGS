import { Request, Response } from 'express';

interface Controller {
  index(req: Request, res: Response): Promise<Response>;
  store(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}

export default Controller;