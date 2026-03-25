import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../axiosConfig'
import ENDPOINTS from '../endpoints'
import type { IDashboardInfo } from '@/interfaces'

export const useDashboardInfoQuery = () => {
  return useQuery({
    queryKey: ['dashboardInfo'],
    queryFn: async (): Promise<IDashboardInfo> => {
      const response = await axiosInstance.get<IDashboardInfo>(ENDPOINTS.DASHBOARD)
      return response.data
    }
  })
}
