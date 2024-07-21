import { DbConnection } from '../gateways/db/db-connection'
import { DoctorRepository } from '../gateways/repositories/doctor-repository'
import { Availability } from '../../base/dto/doctor'
import { DoctorDAO } from '../../base/dao/doctor'

export class DoctorRepositoryImpl implements DoctorRepository {
  constructor(private readonly database: DbConnection) {}

  async update(doctorId: number, availability: Availability[]): Promise<void> {
    const repository = this.database.getConnection().getRepository(DoctorDAO)
    await repository.update(doctorId, { availability })
  }

  async getById(doctorId: number): Promise<DoctorDAO | null> {
    const repository = this.database.getConnection().getRepository(DoctorDAO)
    return await repository.findOneBy({ id: doctorId })
  }

  async findByFilter(
    name?: string,
    crm?: string,
    rating?: number,
  ): Promise<DoctorDAO[]> {
    const repository = this.database.getConnection().getRepository(DoctorDAO)

    const qb = repository.createQueryBuilder('doctor')

    if (name) {
      qb.andWhere('doctor.name LIKE :name', { name: `%${name}%` })
    }

    if (crm) {
      qb.andWhere('doctor.crm LIKE :crm', { crm: `%${crm}%` })
    }

    if (rating) {
      qb.andWhere('doctor.rating = :rating', { rating: Number(rating) })
    }

    return await qb.getMany()
  }
}
