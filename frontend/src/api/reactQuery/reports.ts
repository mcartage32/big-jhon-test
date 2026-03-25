import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../axiosConfig'
import ENDPOINTS from '../endpoints'
import type { IProductLineDeliveryStatsResponse } from '@/interfaces'

export const useDeliveryStatsQuery = (date_from: string, date_to: string) => {
  return useQuery({
    queryKey: ['deliveryStats', date_from, date_to],
    queryFn: async (): Promise<IProductLineDeliveryStatsResponse> => {
      const response = await axiosInstance.get<IProductLineDeliveryStatsResponse>(
        ENDPOINTS.REPORT(date_from, date_to)
      )
      return response.data
    }
  })
}
