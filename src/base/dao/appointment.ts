import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { DoctorDAO } from './doctor'
import { Patient } from './patient'
import { AppointmentEntity } from '../../core/entities/appointment'

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id!: number

  @Column({ type: 'varchar', name: 'date' })
  public date!: string

  @Column({ type: 'varchar', name: 'time' })
  public time!: string

  @Column({ type: 'varchar', name: 'status' })
  public status!: string

  @Column({ type: 'varchar', name: 'declineReason', nullable: true })
  public declineReason!: string

  @Column({ type: 'varchar', name: 'cancellationReason', nullable: true })
  public cancellationReason!: string

  @ManyToOne(() => DoctorDAO, (doctor) => doctor.appointments)
  public doctor!: DoctorDAO

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  public patient!: Patient

  static daoToEntity(appointment: Appointment): AppointmentEntity {
    return new AppointmentEntity(
      appointment.date,
      appointment.time,
      appointment.status,
      appointment.declineReason,
      appointment.cancellationReason,
      appointment.id,
    )
  }

  static daosToEntities(appointments: Appointment[]): AppointmentEntity[] {
    return appointments.map((appointment) =>
      Appointment.daoToEntity(appointment),
    )
  }
}
