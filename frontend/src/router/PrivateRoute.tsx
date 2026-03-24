import { PUBLIC_ROUTE } from '@/constants'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  if (Boolean(sessionStorage.getItem('access_token') ?? null)) return <Outlet />

  return <Navigate replace to={PUBLIC_ROUTE.LOGIN} />
}

export default PrivateRoute
