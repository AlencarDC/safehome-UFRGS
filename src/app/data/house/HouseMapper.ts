import House from '../../models/House';

class HouseMapper {
  public static toDomain(raw: any): House {
    if (!raw) {
      return null;
    }
    
    return new House(raw.camerasStatus, raw.alarmStatus, raw.sprinklersStatus, raw.address, raw.id);
  }

  public static toPersistence(house: House): any {
    return {
      camerasStatus: house.isCamerasON(),
      alarmStatus: house.isAlarmON(),
      sprinklersStatus: house.isSprinklersON(),
      address: house.getAddress(),
    }
  }
}

export default HouseMapper;