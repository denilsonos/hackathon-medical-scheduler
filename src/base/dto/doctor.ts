import { DaysOfWeek } from "../../core/entities/enums/days-of-week"

export type Availability = {
  day: DaysOfWeek,
  times: string[]
}

export class DoctorDTO {
  public id?: number
  public name: string
  public crm: string
  public specialty: string
  public rating: number
  public availability: Availability

  constructor(name: string, crm: string, specialty: string, rating: number, availability: Availability) {
    this.name = name
    this.crm = crm
    this.specialty = specialty
    this.rating = rating
    this.availability = availability
  }
}
