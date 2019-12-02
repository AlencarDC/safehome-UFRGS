import Adapter from '../Adapter';
import Lock from '../../domain/Lock';

interface ILockAdapter extends Adapter<Lock> {
  getLockById(lockId: string): Promise<Lock>;
  findAllLocksByHouseId(houseId: string): Promise<Lock[]>;
}

export default ILockAdapter;