import EletricDevice from '../../models/EletricDevice';

class EletricDeviceMapper {
  public static toDomain(raw: any): EletricDevice {
    if (!raw) {
      return null;
    }
    
    return new EletricDevice(raw.name, raw.status, raw.houseId, raw.id);
  }

  public static toPersistence(eletricDevice: EletricDevice): any {
    return {
      name: eletricDevice.getName(),
      status: eletricDevice.isON(),
      houseId: eletricDevice.getHouse(),
    }
  }
}

export default EletricDeviceMapper;