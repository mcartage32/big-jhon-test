const ENDPOINTS = {
  LOGIN: 'users/login/',
  LOGOUT: 'users/logout/',
  DASHBOARD: 'appointments/dashboard/',
  SUPPLIERS: 'appointments/suppliers/',
  PRODUCT_LINES: 'appointments/product-lines/',
  APPOINTMENTS_STATUSES: 'appointments/statuses/',
  APPOINTMENTS_LIST: 'appointments/list/',
  APPOINTMENTS_CREATE: 'appointments/',
  APPOINTMENTS_DELETE: (id: string) => `appointments/${id}/cancel/`,
  APPOINTMENTS_DETAIL: (id: string) => `appointments/${id}/`,
  APPOINTMENTS_UPDATE: (id: string) => `appointments/${id}/update/`
}

export default ENDPOINTS
