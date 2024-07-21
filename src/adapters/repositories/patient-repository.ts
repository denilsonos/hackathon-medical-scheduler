import { DbConnection } from '../gateways/db/db-connection'
import { PatientRepository } from '../gateways/repositories/patient-repository'
import { Patient } from '../../base/dao/patient'

export class PatientRepositoryImpl implements PatientRepository {
  constructor(private readonly database: DbConnection) {}
  async getByEmail(email: string): Promise<Patient | null> {
    const repository = this.database.getConnection().getRepository(Patient)
    return await repository.findOneBy({ email })
  }
}
