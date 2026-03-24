import { PRIVATE_ROUTE, PUBLIC_ROUTE } from '@/constants'
import { lazy } from 'react'

const Login = lazy(() => import('@/containers/pages/auth/Login'))

// Rutas publicas
export const publicRoutes: { component: React.FC; path: string }[] = [
  {
    path: PUBLIC_ROUTE.LOGIN,
    component: Login
  }
  //   {
  //     path: PUBLIC_ROUTE.PROSPECT_REGISTRATION,
  //     component: ProspectRegistrationPage,
  //   },
  //   {
  //     path: PUBLIC_ROUTE.FORGOT_PASSWORD,
  //     component: ForgotPassword,
  //   },
]

// Rutas privadas
export const privateRoutes: {
  path: string
  component: React.FC
  children?: {
    path: string
    component: React.FC
  }[]
}[] = [
  //   {
  //     path: PRIVATE_ROUTE.PROSPECTS,
  //     component: ProspectManagement,
  //     children: [
  //       {
  //         path: PRIVATE_ROUTE.PROSPECTS_DELETION_MODAL,
  //         component: ProspectDeletionModal,
  //       },
  //       {
  //         path: PRIVATE_ROUTE.PROSPECTS_DISCARD_MODAL,
  //         component: ProspectDiscardModal,
  //       },
  //     ],
  //   },
  {
    path: PRIVATE_ROUTE.DASHBOARD,
    component: () => <div>Dashboard</div>
  }
  //   {
  //     path: PRIVATE_ROUTE.CONFIGURATION,
  //     component: ConfigurationComponent,
  //     permission: PERMISSIONS.SETTINGS,
  //     children: [
  //       {
  //         path: ':url',
  //         component: MasterTableSwitch
  //       }
  //     ]
  //   },
]
