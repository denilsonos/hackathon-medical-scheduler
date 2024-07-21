import { Doctor } from '../../../base/dao/doctor'
import { Availability } from '../../../base/dto/doctor'

export interface DoctorRepository {
  update(doctorId: number, availability: Availability[]): Promise<void>
  getById(doctorId: number): Promise<Doctor | null>

}
