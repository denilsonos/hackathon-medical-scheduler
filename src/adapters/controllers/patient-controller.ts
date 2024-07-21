import { Patient, IParams } from '../gateways/interfaces/patient'
import { DoctorDTO } from '../../base/dto/doctor'
import { DoctorUseCase } from '../gateways/use-cases/doctor-use-case'
import { DoctorRepository } from '../gateways/repositories/doctor-repository'
import { DoctorUseCaseImpl } from '../../core/use-cases/doctor/doctor-use-case'
import { DbConnection } from '../gateways/db/db-connection'
import { DoctorRepositoryImpl } from '../repositories/doctor-repository'
import { DoctorPresenter } from '../presenters/doctor'
import { DoctorEntity } from '../../core/entities/doctor'

export class PatientController implements Patient {
  private doctorUseCase: DoctorUseCase
  private doctorRepository: DoctorRepository

  constructor(readonly database: DbConnection) {
    this.doctorRepository = new DoctorRepositoryImpl(database)
    this.doctorUseCase = new DoctorUseCaseImpl(this.doctorRepository)
  }

  async findDoctorsByFilter(params: IParams): Promise<DoctorDTO[]> {
    const doctors = await this.doctorUseCase.findByFilter(
      params?.name,
      params?.crm,
      params?.rating,
    )

    return doctors.map((doctor: DoctorEntity) =>
      DoctorPresenter.EntityToDto(doctor),
    )
  }
}
