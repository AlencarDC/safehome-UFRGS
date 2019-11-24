import SmartDevice from './SmartDevice';

class EletricDevice extends SmartDevice {

  constructor (name: string, status: boolean, houseId: string, id?: string) {
    super(name, status, houseId, id ? id : null);
  }
}

export default EletricDevice;