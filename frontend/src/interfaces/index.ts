export type AppointmentStatus = 'CANCELLED' | 'DELIVERED' | 'IN_PROGRESS' | 'SCHEDULED'

export interface IStatusCount {
  status: AppointmentStatus
  total: number
}

export interface IDashboardInfo {
  total_by_status: IStatusCount[]
  today_appointments: number
}

export interface IEnums {
  value: string
  label: string
}

export interface IAppointment {
  id: string
  product_line_display: string
  supplier_display: string
  status_display: string
  scheduled_at: string
  supplier: string
  product_line: string
  status: AppointmentStatus
  delivered_at: string | null
  observations: string
  created_at: string
  updated_at: string
  created_by: number
}

export interface IAppointmentsListResponse {
  total: number
  page: number
  total_pages: number
  data: IAppointment[]
}

export interface IAppointmentsFilters {
  limit?: number
  page?: number
  product_line?: string
  supplier?: string
  status?: AppointmentStatus
  scheduled_date?: string // formato YYYY-MM-DD
}
