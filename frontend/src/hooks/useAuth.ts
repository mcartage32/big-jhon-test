import { useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from '@/constants/routes'
import { useLoginMutation, useLogoutMutation } from '@/api/reactQuery'
import { createNotification } from '@/components/NotificationCustom'

export const useAuth = () => {
  const navigate = useNavigate()
  const { mutate: loginMutation, error, isPending } = useLoginMutation()
  const { mutate: logoutMutation } = useLogoutMutation()

  // Mutación para el login
  const handleLogin = (data: { email: string; password: string }) => {
    loginMutation(data, {
      onSuccess: (response) => {
        const token = response.access
        const refreshToken = response.refresh
        sessionStorage.setItem('access_token', token)
        sessionStorage.setItem('refresh_token', refreshToken)
        navigate(PRIVATE_ROUTE.HOME, { replace: true })
      },
      onError: (_error) => {
        createNotification.error({
          message: 'Error de autenticación',
          description: 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.'
        })
      }
    })
  }

  // Función de login
  const login = (credentials: { email: string; password: string }) => {
    handleLogin(credentials)
  }

  const handleLogout = (refresh: string) => {
    logoutMutation(refresh, {
      onSuccess: () => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('refresh_token')
        navigate(PUBLIC_ROUTE.LOGIN, { replace: true })
      },
      onError: () => {
        createNotification.error({
          message: 'Error al cerrar sesión',
          description: 'No se pudo cerrar sesión correctamente. Por favor, inténtalo de nuevo.'
        })
      }
    })
  }

  // Función de logout
  const logout = (refresh: string) => {
    handleLogout(refresh)
  }

  // Verificar autenticación
  const isAuthenticated = () => {
    return !!sessionStorage.getItem('access_token')
  }

  return {
    login,
    logout,
    isAuthenticated,
    isLoading: isPending,
    error: error
  }
}
