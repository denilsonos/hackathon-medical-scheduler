export interface IConfirmOrDeclineAnAppointmentParams {
  id: number
  reason: string
  status: 'confirmed' | 'declined'
}

export interface Doctor {
  updateAvailability(bodyParams: unknown): Promise<void>;
  confirmOrDeclineAnAppointment(
    params: IConfirmOrDeclineAnAppointmentParams,
  ): Promise<void>
}
