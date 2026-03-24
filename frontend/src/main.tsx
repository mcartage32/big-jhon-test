import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './components/NotificationCustom.tsx'
import Router from './router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>
)
