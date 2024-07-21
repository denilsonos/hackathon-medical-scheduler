import { AppointmentDTO } from '../../../base/dto/appointment'
import { DoctorDTO } from '../../../base/dto/doctor'

export interface IFindDoctorsByFilterParams {
  name?: string
  crm?: string
  rating?: number
}

export interface IMakeAnAppointmentParams {
  doctorId: number
  patientEmail: string
  date: string
  time: string
}

export interface Patient {
  findDoctorsByFilter(params: IFindDoctorsByFilterParams): Promise<DoctorDTO[]>
  makeAnAppointment(params: IMakeAnAppointmentParams): Promise<AppointmentDTO>
}
