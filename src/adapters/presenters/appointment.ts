import { AppointmentDTO } from '../../base/dto/appointment'
import { AppointmentEntity } from '../../core/entities/appointment'

export class AppointmentPresenter {
  static EntityToDto(appointmentEntity: AppointmentEntity): AppointmentDTO {
    return new AppointmentDTO(
      appointmentEntity.date,
      appointmentEntity.time,
      appointmentEntity.status,
      appointmentEntity.declineReason,
      appointmentEntity.cancellationReason,
      appointmentEntity.id,
    )
  }

  static EntitiesToDtos(
    appointmentEntities: AppointmentEntity[],
  ): AppointmentDTO[] {
    return appointmentEntities.map((appointmentEntity: AppointmentEntity) =>
      AppointmentPresenter.EntityToDto(appointmentEntity),
    )
  }
}
