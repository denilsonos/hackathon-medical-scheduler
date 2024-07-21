import { Availability } from '../../base/dto/doctor'

export class DoctorEntity {
  public id: number
  public name: string
  public crm: string
  public specialty: string
  public rating: number
  public availability: Availability[]

  constructor(
    name: string,
    crm: string,
    specialty: string,
    rating: number,
    availability: Availability[],
    id: number,
  ) {
    this.id = id
    this.name = name
    this.crm = crm
    this.specialty = specialty
    this.rating = rating
    this.availability = availability
  }
}
