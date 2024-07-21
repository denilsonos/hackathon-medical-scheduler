import { Patient } from '../../../base/dao/patient'

export interface PatientRepository {
  getByEmail(email: string): Promise<Patient | null>
}
