import IEletricDevice from './IEletricDevice';
import EletricDeviceMapper from './EletricDeviceMapper';

import EletricDeviceModelSequelize from '../../../database/models/EletricDevice';

import EletricDevice from '../../models/EletricDevice';

class EletricDeviceDAO implements IEletricDevice {

  public async exists(eletricDevice: EletricDevice): Promise<boolean> {;
    const result = await EletricDeviceModelSequelize.findOne({
      where: { id: eletricDevice.getId() },
    });

    return !!result === true;
  }

  public async delete(eletricDevice: EletricDevice): Promise<boolean> { 
    const result = await EletricDeviceModelSequelize.destroy({ 
      where: { id: eletricDevice.getId() } 
    });

    return !!result;
  }

  public async save(eletricDevice: EletricDevice): Promise<EletricDevice> {
    const rawEletricDevice = EletricDeviceMapper.toPersistence(eletricDevice);

    const dbEletricDevice = await EletricDeviceModelSequelize.create(rawEletricDevice);

    return EletricDeviceMapper.toDomain(dbEletricDevice);
  }

  public async update(eletricDevice: EletricDevice): Promise<EletricDevice> {
    const updatedRows = await EletricDeviceModelSequelize.update(EletricDeviceMapper.toPersistence(eletricDevice), { 
      where: { id: eletricDevice.getId() }, 
    });

    return (updatedRows[0] > 0 ? EletricDeviceMapper.toDomain(eletricDevice) : null);
  }

  public async getById(eletricDeviceId: string): Promise<EletricDevice> {
    const result = await EletricDeviceModelSequelize.findOne({
      where: { id: eletricDeviceId },
    });

    return EletricDeviceMapper.toDomain(result);
  }
  
  public async getEletricDeviceById(eletricDeviceId: string): Promise<EletricDevice> {
    return await this.getById(eletricDeviceId);
  }
}

export default EletricDeviceDAO;