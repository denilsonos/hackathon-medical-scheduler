import { AppointmentEntity } from '../../../core/entities/appointment'

export interface IMakeAnAppointmentParams {
  doctorId: number
  email: string
  date: string
  time: string
}

export interface PatientUseCase {
  makeAnAppointment(
    params: IMakeAnAppointmentParams,
  ): Promise<AppointmentEntity>
}
