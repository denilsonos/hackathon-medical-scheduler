import { IConfirmOrDeclineAnAppointmentParams } from '../../../adapters/gateways/interfaces/doctor'
import { AppointmentRepository } from '../../../adapters/gateways/repositories/appointment-repository'
import { DoctorRepository } from '../../../adapters/gateways/repositories/doctor-repository'
import { DoctorUseCase } from '../../../adapters/gateways/use-cases/doctor-use-case'
import { DoctorDAO } from '../../../base/dao/doctor'
import { Availability } from '../../../base/dto/doctor'
import { DoctorEntity } from '../../entities/doctor'
import { NotFoundException } from '../../entities/exceptions'

export class DoctorUseCaseImpl implements DoctorUseCase {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

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

    return DoctorDAO.daosToEntities(doctors)
  }

  async confirmOrDeclineAnAppointment({
    id,
    reason,
    status,
  }: IConfirmOrDeclineAnAppointmentParams): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id)

    if (!appointment) throw new NotFoundException('Appointment not found!')

    if (appointment.status === status)
      throw new NotFoundException('Appointment already has this status!')

    if (appointment.status !== 'pending')
      throw new NotFoundException('Appointment is not pending!')

    await this.appointmentRepository.confirmOrDecline({
      appointment,
      reason,
      status,
    })
  }
}
