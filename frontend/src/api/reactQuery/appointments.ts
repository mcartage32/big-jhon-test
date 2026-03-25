import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../axiosConfig'
import ENDPOINTS from '../endpoints'
import type {
  IAppointmentsListResponse,
  IAppointmentsFilters,
  ICreateAppointmentPayload
} from '@/interfaces'

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

export const useCreateAppointmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: ICreateAppointmentPayload) => {
      const response = await axiosInstance.post(ENDPOINTS.APPOINTMENTS_CREATE, payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointmentsList'] })
    }
  })
}

export const useDeleteAppointmentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(ENDPOINTS.APPOINTMENTS_DELETE(id))
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointmentsList'] })
    }
  })
}
