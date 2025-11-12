export const URLS = {
  AUTH: {
    LOGIN: '/',
    REGISTER: '/create-account',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: {
      DASHBOARD: '/dashboard',
      USERS: '/users',
      PROJECTS: '/projects',
      BID: '/bids',
      PROPERTIES: '/properties',
      TRANSACTIONS: '/transactions',
      DOCUMENTS: '/documents',
      MEETING: '/meeting',
      SUPPORT: '/support',
      SETTINGS: '/settings',
    }
} as const;
