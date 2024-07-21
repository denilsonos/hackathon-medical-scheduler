import { DoctorRepository } from '../../../adapters/gateways/repositories/doctor-repository'
import { DoctorUseCase } from '../../../adapters/gateways/use-cases/doctor-use-case'
import { DoctorDAO } from '../../../base/dao/doctor'
import { Availability } from '../../../base/dto/doctor'
import { DoctorEntity } from '../../entities/doctor'
import { NotFoundException } from '../../entities/exceptions'

export class DoctorUseCaseImpl implements DoctorUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  public async updateAvailability(
    doctorId: number,
    availability: Availability[],
  ): Promise<void> {
    const doctor = await this.doctorRepository.getById(doctorId)
    if (!doctor) {
      throw new NotFoundException('Doctor not found!')
    }

    await this.doctorRepository.update(doctorId, availability)
  }

  async findByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorEntity[]> {
    const doctors = await this.doctorRepository.findByFilter(name, crm, rating)

    return doctors.map((doctor: DoctorDAO) => DoctorDAO.daoToEntity(doctor))
  }
}
