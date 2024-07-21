import { DoctorDTO } from '../../base/dto/doctor'
import { DoctorEntity } from '../../core/entities/doctor'

export class DoctorPresenter {
  static EntityToDto(doctorEntity: DoctorEntity): DoctorDTO {
    return new DoctorDTO(
      doctorEntity.name,
      doctorEntity.crm,
      doctorEntity.specialty,
      doctorEntity.rating,
      doctorEntity.availability,
      doctorEntity.id,
    )
  }

  static EntitiesToDtos(doctorEntities: DoctorEntity[]): DoctorDTO[] {
    return doctorEntities.map((doctor: DoctorEntity) =>
      DoctorPresenter.EntityToDto(doctor),
    )
  }
}
