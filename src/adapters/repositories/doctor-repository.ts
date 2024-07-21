import { DbConnection } from '../gateways/db/db-connection'
import { DoctorRepository } from '../gateways/repositories/doctor-repository'
import { Availability } from '../../base/dto/doctor'
import { Doctor } from '../../base/dao/doctor'

export class DoctorRepositoryImpl implements DoctorRepository {
  constructor(private readonly database: DbConnection) { }

  async update(doctorId: number, availability: Availability[]): Promise<void> {
    const repository = this.database.getConnection().getRepository(Doctor)
    await repository.update(doctorId, { availability })
  }

  async getById(doctorId: number): Promise<Doctor | null> {
    const repository = this.database.getConnection().getRepository(Doctor)
    return await repository.findOneBy({ id: doctorId })
  }
}
