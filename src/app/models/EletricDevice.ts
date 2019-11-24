import SmartDevice from './SmartDevice';

class EletricDevice extends SmartDevice {

  constructor (name: string, status: boolean, houseId: string, turnOnTime: string, turnOffTime: string, id?: string) {
    super(name, status, houseId, turnOnTime, turnOffTime, id ? id : null);
  }
}

export default EletricDevice;