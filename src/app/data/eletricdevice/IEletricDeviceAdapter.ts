import Adapter from '../Adapter';
import EletricDevice from '../../domain/EletricDevice';

interface IEletricDevice extends Adapter<EletricDevice> {
  getEletricDeviceById(eletricDeviceId: string): Promise<EletricDevice>;
  findAllEletricDevicesByHouseId(houseId: string): Promise<EletricDevice[]>;
}

export default IEletricDevice;