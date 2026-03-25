import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import axiosInstance from '../axiosConfig'
import ENDPOINTS from '../endpoints'

export const useLoginMutation = () => {
  try {
    return useMutation({
      mutationKey: ['login'],
      mutationFn: async (sendData: { email: string; password: string }) => {
        const response = await axiosInstance.post(ENDPOINTS.LOGIN, sendData)
        return response.data
      }
    })
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || 'Email o contraseña incorrectos'
      throw new Error(message)
    }
    throw new Error('Error desconocido')
  }
}

export const useLogoutMutation = () => {
  try {
    return useMutation({
      mutationKey: ['logout'],
      mutationFn: async (refresh: string) => {
        const response = await axiosInstance.post(ENDPOINTS.LOGOUT, { refresh })
        return response.data
      }
    })
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || 'Error al cerrar sesión'
      throw new Error(message)
    }
    throw new Error('Error desconocido')
  }
}
