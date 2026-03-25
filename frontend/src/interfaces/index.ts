export type AppointmentStatus = 'CANCELLED' | 'DELIVERED' | 'IN_PROGRESS' | 'SCHEDULED'

export interface IStatusCount {
  status: AppointmentStatus
  total: number
}

export interface IDashboardInfo {
  total_by_status: IStatusCount[]
  today_appointments: number
}
