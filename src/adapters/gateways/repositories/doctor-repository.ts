import { DoctorDAO } from '../../../base/dao/doctor'

export interface DoctorRepository {
  findAllByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorDAO[]>
}
