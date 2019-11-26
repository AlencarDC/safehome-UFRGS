import DAO from '../DAO';
import EletricDevice from '../../models/EletricDevice';

interface IEletricDevice extends DAO<EletricDevice> {
  getEletricDeviceById(eletricDeviceId: string): Promise<EletricDevice>;
  findAllEletricDevicesByHouseId(houseId: string): Promise<EletricDevice[]>;
}

export default IEletricDevice;