import { DbConnection } from '../gateways/db/db-connection'
import {
  AppointmentRepository,
  ICancelParams,
  IConfirmOrDeclineParams,
  ICreateParams,
  IFindByDateAndTimeParams,
} from '../gateways/repositories/appointment-repository'
import { Appointment } from '../../base/dao/appointment'
import { In, Not } from 'typeorm'

export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private readonly database: DbConnection) {}
  async confirmOrDecline({
    appointment,
    reason,
    status,
  }: IConfirmOrDeclineParams): Promise<void> {
    const repository = this.database.getConnection().getRepository(Appointment)

    appointment.status = status
    if (reason) appointment.declineReason = reason

    await repository.save(appointment)
  }

  async cancel({ appointment, reason }: ICancelParams): Promise<void> {
    const repository = this.database.getConnection().getRepository(Appointment)

    appointment.status = 'cancelled'
    appointment.cancellationReason = reason

    await repository.save(appointment)
  }

  async findById(id: number): Promise<Appointment | null> {
    const repository = this.database.getConnection().getRepository(Appointment)

    return await repository.findOne({
      where: { id },
    })
  }

  async findByDateAndTime({
    doctorId,
    date,
    time,
    status,
  }: IFindByDateAndTimeParams): Promise<Appointment | null> {
    const repository = this.database.getConnection().getRepository(Appointment)

    return await repository.findOneBy({
      doctor: { id: doctorId },
      date,
      time,
      status: status ?? Not(In(['cancelled', 'declined'])),
    })
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
