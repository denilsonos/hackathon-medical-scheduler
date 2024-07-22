import {
  ICancelAnAppointmentParams,
  IConfirmOrDeclineAnAppointmentParams,
  IFindDoctorsByFilterParams,
  IMakeAnAppointmentParams,
  Patient,
} from '../gateways/interfaces/patient'
import { DoctorDTO } from '../../base/dto/doctor'
import { DoctorUseCase } from '../gateways/use-cases/doctor-use-case'
import { DoctorRepository } from '../gateways/repositories/doctor-repository'
import { DoctorUseCaseImpl } from '../../core/use-cases/doctor/doctor-use-case'
import { DbConnection } from '../gateways/db/db-connection'
import { DoctorRepositoryImpl } from '../repositories/doctor-repository'
import { DoctorPresenter } from '../presenters/doctor'
import { z } from 'zod'
import { BadRequestException } from '../../core/entities/exceptions'
import { AppointmentRepository } from '../gateways/repositories/appointment-repository'
import { AppointmentRepositoryImpl } from '../repositories/appointment-repository'
import { PatientUseCase } from '../gateways/use-cases/patient-use-case'
import { PatientUseCaseImpl } from '../../core/use-cases/patient/patient-use-case'
import { PatientRepository } from '../gateways/repositories/patient-repository'
import { PatientRepositoryImpl } from '../repositories/patient-repository'
import { AppointmentPresenter } from '../presenters/appointment'
import { AppointmentDTO } from '../../base/dto/appointment'

export class PatientController implements Patient {
  private doctorUseCase: DoctorUseCase
  private doctorRepository: DoctorRepository
  private patientRepository: PatientRepository
  private appointmentRepository: AppointmentRepository
  private patientUseCase: PatientUseCase

  constructor(readonly database: DbConnection) {
    this.doctorRepository = new DoctorRepositoryImpl(database)
    this.doctorUseCase = new DoctorUseCaseImpl(this.doctorRepository)

    this.patientRepository = new PatientRepositoryImpl(database)
    this.appointmentRepository = new AppointmentRepositoryImpl(database)
    this.patientUseCase = new PatientUseCaseImpl(
      this.patientRepository,
      this.doctorRepository,
      this.appointmentRepository,
    )
  }

  async confirmOrDeclineAnAppointment(
    params: IConfirmOrDeclineAnAppointmentParams,
  ): Promise<void> {
    const schema = z.object({
      id: z.number(),
      reason: z.string(),
      status: z.enum(['confirmed', 'declined']),
    })

    const result = schema.safeParse(params)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { id, reason, status } = params

    await this.patientUseCase.confirmOrDeclineAnAppointment({
      id,
      reason,
      status,
    })
  }

  async cancelAnAppointment(params: ICancelAnAppointmentParams): Promise<void> {
    const schema = z.object({
      id: z.number(),
      reason: z.string(),
    })

    const result = schema.safeParse(params)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { id, reason } = params

    await this.patientUseCase.cancelAnAppointment({
      id,
      reason,
    })
  }

  async findDoctorsByFilter(
    params: IFindDoctorsByFilterParams,
  ): Promise<DoctorDTO[]> {
    const schema = z.object({
      name: z.string().optional(),
      crm: z.string().optional(),
      rating: z.number().optional(),
    })

    const result = schema.safeParse(params)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const doctors = await this.doctorUseCase.findByFilter(
      params?.name,
      params?.crm,
      params?.rating,
    )

    return DoctorPresenter.EntitiesToDtos(doctors)
  }

  async makeAnAppointment(
    params: IMakeAnAppointmentParams,
  ): Promise<AppointmentDTO> {
    const schema = z.object({
      doctorId: z.number(),
      patientEmail: z.string().email(),
      date: z.string().regex(/\d{4}-\d{2}-\d{2}/),
      time: z
        .string()
        .regex(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          'Invalid time format, must be HH:MM',
        ),
    })

    const result = schema.safeParse(params)

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { patientEmail, ...rest } = params

    const appointment = await this.patientUseCase.makeAnAppointment({
      email: patientEmail,
      ...rest,
    })

    return AppointmentPresenter.EntityToDto(appointment)
  }
}
