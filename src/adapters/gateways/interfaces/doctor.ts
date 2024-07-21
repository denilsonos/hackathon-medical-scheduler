import { DoctorDTO } from '../../../base/dto/doctor'

export interface IParams {
  name?: string
  crm?: string
  rating?: number
}

export interface Doctor {
  findAllByFilter(params: IParams): Promise<DoctorDTO[]>
}
