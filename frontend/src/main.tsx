import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './components/NotificationCustom.tsx'
import { ConfigProvider } from 'antd'
import esES from 'antd/locale/es_ES'
import Router from './router'
import dayjs from 'dayjs'
import './main.scss'
import 'dayjs/locale/es'

dayjs.locale('es')
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={esES}>
          <Router />
        </ConfigProvider>
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>
)
