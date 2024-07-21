import { DoctorDAO } from '../../../base/dao/doctor'
import { Availability } from '../../../base/dto/doctor'

export interface DoctorRepository {
  update(doctorId: number, availability: Availability[]): Promise<void>
  getById(doctorId: number): Promise<DoctorDAO | null>
  findByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorDAO[]>
}
