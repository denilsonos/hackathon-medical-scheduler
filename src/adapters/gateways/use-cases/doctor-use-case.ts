import { DoctorEntity } from '../../../core/entities/doctor'

export interface DoctorUseCase {
  findAllByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorEntity[]>
}
