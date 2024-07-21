import { z } from "zod";
import { BadRequestException } from "../../core/entities/exceptions";
import { DbConnection } from "../gateways/db/db-connection";
import { DaysOfWeek } from "../../core/entities/enums/days-of-week";
import { DoctorUseCase } from "../gateways/use-cases/doctor-use-case";
import { DoctorRepository } from "../gateways/repositories/doctor-repository";
import { DoctorUseCaseImpl } from "../../core/use-cases/doctor/doctor-use-case";
import { DoctorRepositoryImpl } from "../repositories/doctor-repository";

export class DoctorController {
  private doctorUseCase: DoctorUseCase;
  private doctorRepository: DoctorRepository;

  constructor(readonly database: DbConnection) {
    this.doctorRepository = new DoctorRepositoryImpl(database);
    this.doctorUseCase = new DoctorUseCaseImpl(this.doctorRepository);
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
}