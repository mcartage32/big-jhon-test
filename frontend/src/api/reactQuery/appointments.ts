import { useQuery, keepPreviousData } from '@tanstack/react-query'
import axiosInstance from '../axiosConfig'
import ENDPOINTS from '../endpoints'
import type { IAppointmentsListResponse, IAppointmentsFilters } from '@/interfaces'

export const useAppointmentsListQuery = (params?: IAppointmentsFilters) => {
  return useQuery({
    queryKey: ['appointmentsList', params],
    queryFn: async (): Promise<IAppointmentsListResponse> => {
      const response = await axiosInstance.get<IAppointmentsListResponse>(
        ENDPOINTS.APPOINTMENTS_LIST,
        {
          params
        }
      )
      return response.data
    },
    placeholderData: keepPreviousData
  })
}
