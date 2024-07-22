import { DbConnection } from '../gateways/db/db-connection'
import {
  AppointmentRepository,
  ICreateParams,
  IFindByDateAndTime,
} from '../gateways/repositories/appointment-repository'
import { Appointment } from '../../base/dao/appointment'

export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly database: DbConnection) {}
  async findByDateAndTime({
    doctorId,
    date,
    time,
  }: IFindByDateAndTime): Promise<Appointment | null> {
    const repository = this.database.getConnection().getRepository(Appointment)

    return await repository.findOneBy({ doctor: { id: doctorId }, date, time })
  }

  async create({
    patient,
    doctor,
    date,
    time,
    status = 'pending',
  }: ICreateParams): Promise<Appointment> {
    const repository = this.database.getConnection().getRepository(Appointment)

    const appointment = repository.create({
      date,
      patient,
      doctor,
      time,
      status,
    })

    return await repository.save(appointment)
  }
}
