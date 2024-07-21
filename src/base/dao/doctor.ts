import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Appointment } from './appointment'
import { DoctorEntity } from '../../core/entities/doctor'
import { Availability } from '../dto/doctor'

@Entity('doctor')
export class DoctorDAO {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id!: number

  @Column({ type: 'varchar', name: 'name' })
  public name!: string

  @Column({ type: 'varchar', name: 'crm' })
  public crm!: string

  @Column({ type: 'varchar', name: 'specialty' })
  public specialty!: string

  @Column({ type: 'int', name: 'rating' })
  public rating!: number

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  public appointments!: Appointment[]

  @Column('simple-json')
  public availability!: Availability[]

  static daoToEntity(doctor: DoctorDAO): DoctorEntity {
    return new DoctorEntity(
      doctor.name,
      doctor.crm,
      doctor.specialty,
      doctor.rating,
      doctor.availability,
      doctor.id,
    )
  }

  static daosToEntities(doctors: DoctorDAO[]): DoctorEntity[] {
    return doctors.map((doctor) => DoctorDAO.daoToEntity(doctor))
  }
}
