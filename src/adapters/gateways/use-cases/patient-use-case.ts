import { AppointmentEntity } from '../../../core/entities/appointment'

export interface IMakeAnAppointmentParams {
  doctorId: number
  email: string
  date: string
  time: string
}

export interface ICancelAnAppointmentParams {
  id: number
  reason: string
}

export interface PatientUseCase {
  makeAnAppointment(
    params: IMakeAnAppointmentParams,
  ): Promise<AppointmentEntity>

  cancelAnAppointment(params: ICancelAnAppointmentParams): Promise<void>
}
