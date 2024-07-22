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

export interface IFindByDateAndTimeParams {
  doctorId: number
  date: string
  time: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

export interface ICancelParams {
  appointment: Appointment
  reason: string
}

export interface AppointmentRepository {
  create(params: ICreateParams): Promise<Appointment>
  findByDateAndTime(
    params: IFindByDateAndTimeParams,
  ): Promise<Appointment | null>
  findById(id: number): Promise<Appointment | null>
  cancel(params: ICancelParams): Promise<void>
}
