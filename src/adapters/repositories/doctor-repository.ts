import { DbConnection } from '../gateways/db/db-connection'
import { DoctorDAO } from '../../base/dao/doctor'
import { DoctorRepository } from '../gateways/repositories/doctor-repository'

export class DoctorRepositoryImpl implements DoctorRepository {
  constructor(private readonly database: DbConnection) {}

  async findAllByFilter(
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
