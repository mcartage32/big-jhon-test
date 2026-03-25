import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../axiosConfig'
import ENDPOINTS from '../endpoints'
import type { IEnums } from '@/interfaces'

export const useSuppliersListQuery = () => {
  return useQuery({
    queryKey: ['suppliersList'],
    queryFn: async (): Promise<IEnums[]> => {
      const response = await axiosInstance.get<IEnums[]>(ENDPOINTS.SUPPLIERS)
      return response.data
    }
  })
}

export const useProductLinesListQuery = () => {
  return useQuery({
    queryKey: ['productLinesList'],
    queryFn: async (): Promise<IEnums[]> => {
      const response = await axiosInstance.get<IEnums[]>(ENDPOINTS.PRODUCT_LINES)
      return response.data
    }
  })
}

export const useAppointmentsStatusesListQuery = () => {
  return useQuery({
    queryKey: ['appointmentsStatusesList'],
    queryFn: async (): Promise<IEnums[]> => {
      const response = await axiosInstance.get<IEnums[]>(ENDPOINTS.APPOINTMENTS_STATUSES)
      return response.data
    }
  })
}
