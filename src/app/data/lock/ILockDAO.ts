import DAO from '../DAO';
import Lock from '../../models/Lock';

interface ILockDAO extends DAO<Lock> {
  getLockById(lockId: string): Promise<Lock>;
  findAllLocksByHouseId(houseId: string): Promise<Lock[]>;
}

export default ILockDAO;