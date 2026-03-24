// Rutas publicas
export const PUBLIC_ROUTE = {
  LOGIN: '/login',
  PROSPECT_REGISTRATION: '/registro-prospectos',
  FORGOT_PASSWORD: '/olvido-contrasena'
}

// Rutas privadas
export const PRIVATE_ROUTE = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROSPECTS: '/prospectos',
  PROSPECTS_DELETION_MODAL: 'eliminacion', // Hija de prospectos
  PROSPECTS_DISCARD_MODAL: 'descarte', // Hija de prospectos
  PROSPECTS_HISTOY: '/prospectos-historico',
  PROSPECTS_CV: (id: number) => `${import.meta.env.VITE_API_URL}/cv/${id}`,
  CANDIDATES_TRACKING: '/candidatos-seguimiento',
  CANDIDATES_TRACKING_DELETE_STEPS_SELECTION: `eliminar-pasos-seleccion/candidato/:id`, // Hija de candidatos-seguimiento
  CANDIDATES_TRACKING_DELETE_STEPS_SELECTION_LINK: (id: number) =>
    `eliminar-pasos-seleccion/candidato/${id}`,
  CANDIDATES_TRACKING_ADD_STEPS_SELECTION: `agregar-pasos-seleccion/candidato/:id`, // Hija de candidatos-seguimiento
  CANDIDATES_TRACKING_ADD_STEPS_SELECTION_LINK: (id: number) =>
    `agregar-pasos-seleccion/candidato/${id}`,
  CANDIDATES_DOCUMENTS: '/candidatos-documentos',
  CANDIDATES_DOCUMENTS_DETAIL_BY_CANDIDATE: '/candidatos-documentos/:id',
  CANDIDATES_DOCUMENTS_DETAIL_UPDATE_INDUCTION: 'actualizar-induccion', //Hija de /candidatos-documentos/:id"
  CANDIDATES_DOCUMENTS_DETAIL_BY_CANDIDATE_LINK: (id: number) => `/candidatos-documentos/${id}`,
  INDUCTION_PROGRAMMING: '/programacion-induccion',
  INDUCTION_PROGRAMMING_UPDATE_DATE: 'actualizar-fecha/:id',
  INDUCTION_PROGRAMMING_UPDATE_DATE_LINK: (id: number) => `actualizar-fecha/${id}`,
  HIRING: 'contratacion',
  CONFIGURATION: 'configuracion',
  STATISTICS: 'estadisticas'
}

export const CANDIDATE_ROUTE = {
  HOME: '/',
  PROFILE: '/mi-perfil',
  DOCUMENTS: '/mis-documentos'
}
