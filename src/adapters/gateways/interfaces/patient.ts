import { DoctorDTO } from '../../../base/dto/doctor'

export interface IParams {
  name?: string
  crm?: string
  rating?: number
}

export interface Patient {
  findDoctorsByFilter(params: IParams): Promise<DoctorDTO[]>
}
