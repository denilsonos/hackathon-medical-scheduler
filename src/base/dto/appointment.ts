export class AppointmentDTO {
  public id: number
  public date: string
  public time: string
  public status: string
  public declineReason: string
  public cancellationReason: string

  constructor(
    date: string,
    time: string,
    status: string,
    declineReason: string,
    cancellationReason: string,
    id: number,
  ) {
    this.date = date
    this.time = time
    this.status = status
    this.declineReason = declineReason
    this.cancellationReason = cancellationReason
    this.id = id
  }
}
