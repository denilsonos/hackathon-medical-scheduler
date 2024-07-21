import { Availability } from "../../../base/dto/doctor";

export interface DoctorUseCase {
  updateAvailability(doctorId: number, availability: Availability[]): Promise<void>
}
