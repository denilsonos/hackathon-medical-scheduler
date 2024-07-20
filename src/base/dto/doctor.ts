export class DoctorDTO {
  public id?: number
  public name: string
  public crm: string
  public specialty: string
  public rating: number

  constructor(name: string, crm: string, specialty: string, rating: number) {
    this.name = name
    this.crm = crm
    this.specialty = specialty
    this.rating = rating
  }
}
