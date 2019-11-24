import Lock from '../../models/Lock';

class LockMapper {
  public static toDomain(raw: any): Lock {
    if (!raw) {
      return null;
    }
    
    return new Lock(raw.name, raw.status, raw.houseId, raw.id);
  }

  public static toPersistence(lock: Lock): any {
    return {
      name: lock.getName(),
      status: lock.isON(),
      houseId: lock.getHouse(),
    }
  }
}

export default LockMapper;