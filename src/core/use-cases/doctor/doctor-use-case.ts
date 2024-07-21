import { DoctorUseCase } from '../../../adapters/gateways/use-cases/doctor-use-case'
import { DoctorRepository } from '../../../adapters/gateways/repositories/doctor-repository'
import { DoctorEntity } from '../../entities/doctor'
import { DoctorDAO } from '../../../base/dao/doctor'

export class DoctorUseCaseImpl implements DoctorUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}
  async findAllByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorEntity[]> {
    const doctors = await this.doctorRepository.findAllByFilter(
      name,
      crm,
      rating,
    )

    return doctors.map((doctor: DoctorDAO) => DoctorDAO.daoToEntity(doctor))
  }
}
