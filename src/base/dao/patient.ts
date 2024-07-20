import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Appointment } from './appointment'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id!: number

  @Column({ type: 'varchar', name: 'name' })
  public name!: string

  @Column({ type: 'varchar', name: 'email' })
  public email!: string

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  public appointments!: Appointment[]
}
