import { AppointmentRepository } from '../../../adapters/gateways/repositories/appointment-repository'
import { DoctorRepository } from '../../../adapters/gateways/repositories/doctor-repository'
import { PatientRepository } from '../../../adapters/gateways/repositories/patient-repository'
import {
  IMakeAnAppointmentParams,
  PatientUseCase,
} from '../../../adapters/gateways/use-cases/patient-use-case'
import { Appointment } from '../../../base/dao/appointment'
import { AppointmentEntity } from '../../entities/appointment'
import { NotFoundException } from '../../entities/exceptions'

export class PatientUseCaseImpl implements PatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async makeAnAppointment({
    doctorId,
    email,
    date,
    time,
  }: IMakeAnAppointmentParams): Promise<AppointmentEntity> {
    const doctor = await this.doctorRepository.getById(doctorId)
    if (!doctor) {
      throw new NotFoundException('Doctor not found!')
    }

    const patient = await this.patientRepository.getByEmail(email)
    if (!patient) {
      throw new NotFoundException('Patient not found!')
    }

    const appointment = await this.appointmentRepository.create({
      doctor,
      patient,
      date,
      time,
    })

    return Appointment.daoToEntity(appointment)
  }
}
