import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Doctor } from './doctor'
import { Patient } from './patient'

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

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  public doctor!: Doctor

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  public patient!: Patient
}
