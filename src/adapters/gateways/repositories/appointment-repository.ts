import { Appointment } from '../../../base/dao/appointment'
import { DoctorDAO } from '../../../base/dao/doctor'
import { Patient } from '../../../base/dao/patient'

export interface ICreateParams {
  patient: Patient
  doctor: DoctorDAO
  date: string
  time: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

export interface AppointmentRepository {
  create(params: ICreateParams): Promise<Appointment>
}
