import { z } from "zod";
import { BadRequestException } from "../../core/entities/exceptions";
import { DbConnection } from "../gateways/db/db-connection";
import { DaysOfWeek } from "../../core/entities/enums/days-of-week";
import { DoctorUseCase } from "../gateways/use-cases/doctor-use-case";
import { DoctorRepository } from "../gateways/repositories/doctor-repository";
import { DoctorUseCaseImpl } from "../../core/use-cases/doctor/doctor-use-case";
import { DoctorRepositoryImpl } from "../repositories/doctor-repository";
import { Doctor, IConfirmOrDeclineAnAppointmentParams } from "../gateways/interfaces/doctor";
import { AppointmentRepository } from "../gateways/repositories/appointment-repository";
import { AppointmentRepositoryImpl } from "../repositories/appointment-repository";

export class DoctorController implements Doctor {
  private doctorUseCase: DoctorUseCase;
  private doctorRepository: DoctorRepository;
  private appointmentRepository: AppointmentRepository;

  constructor(readonly database: DbConnection) {
    this.doctorRepository = new DoctorRepositoryImpl(database);
    this.appointmentRepository = new AppointmentRepositoryImpl(database);
    this.doctorUseCase = new DoctorUseCaseImpl(this.doctorRepository, this.appointmentRepository);
  }
  async updateAvailability(bodyParams: unknown): Promise<void> {
    const schema = z.object({
      doctorId: z.number(),
      availability: z.array(
        z.object({
          day: z.nativeEnum(DaysOfWeek),
          times: z.array(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, must be HH:MM")),
        })).nonempty(),
    })

    const result = schema.safeParse(bodyParams);

    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { doctorId, availability } = result.data
    await this.doctorUseCase.updateAvailability(doctorId, availability)
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

    await this.doctorUseCase.confirmOrDeclineAnAppointment({
      id,
      reason,
      status,
    })
  }
}