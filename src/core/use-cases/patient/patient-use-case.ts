import { AppointmentRepository } from '../../../adapters/gateways/repositories/appointment-repository'
import { DoctorRepository } from '../../../adapters/gateways/repositories/doctor-repository'
import { PatientRepository } from '../../../adapters/gateways/repositories/patient-repository'
import {
  IMakeAnAppointmentParams,
  PatientUseCase,
} from '../../../adapters/gateways/use-cases/patient-use-case'
import { Appointment } from '../../../base/dao/appointment'
import { Availability } from '../../../base/dto/doctor'
import { AppointmentEntity } from '../../entities/appointment'
import { DaysOfWeek, DaysOfWeekNumber } from '../../entities/enums/days-of-week'
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

    const selectedDay = new Date(`${date}T23:59`).getDay()
    const dayOfWeek = DaysOfWeekNumber[selectedDay]

    const isValidTime = doctor.availability
      .find(({ day }: Availability) => day === dayOfWeek)
      ?.times.includes(time)

    if (!isValidTime) throw new NotFoundException('Invalid time selected!')

    const appointmentExists =
      await this.appointmentRepository.findByDateAndTime({
        date,
        time,
        doctorId,
      })

    if (appointmentExists)
      throw new NotFoundException('Date and time already in use!')

    const appointment = await this.appointmentRepository.create({
      doctor,
      patient,
      date,
      time,
    })

    return Appointment.daoToEntity(appointment)
  }
}
