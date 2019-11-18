declare namespace Express {
  export interface Request {
    userId?: string;
    houseId?: string;
    isAdmin?: boolean;
  }
}
//Extendendo o namescpace de Express para conter o id do usuário no Request