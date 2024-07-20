import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id!: number;

  @Column({ type: 'varchar', name: 'name' })
  public name!: string;

  @Column({ type: 'varchar', name: 'specialty' })
  public specialty!: string;

  @Column({ type: 'int', name: 'rating'})
  public rating!: number;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  public appointments!: Appointment[];

  @Column("simple-json")
  public availability!: { day: string, times: string[] }[];
}