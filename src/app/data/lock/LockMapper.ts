import Lock from '../../domain/Lock';

class LockMapper {
  public static toDomain(raw: any): Lock {
    if (!raw) {
      return null;
    }
    
    return new Lock(raw.name, raw.status, raw.houseId, raw.turnOnTime, raw.turnOffTime, raw.id);
  }

  public static toPersistence(lock: Lock): any {
    return {
      name: lock.getName(),
      status: lock.isON(),
      houseId: lock.getHouse(),
      turnOnTime: lock.getTurnOnTime(),
      turnOffTime: lock.getTurnOffTime(),
    }
  }
}

export default LockMapper;