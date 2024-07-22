import { Availability } from '../../../base/dto/doctor'
import { DoctorEntity } from '../../../core/entities/doctor'
import { IConfirmOrDeclineAnAppointmentParams } from '../interfaces/doctor'

export interface DoctorUseCase {
  updateAvailability(
    doctorId: number,
    availability: Availability[],
  ): Promise<void>
  findByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorEntity[]>
  confirmOrDeclineAnAppointment(
    params: IConfirmOrDeclineAnAppointmentParams,
  ): Promise<void>
}
