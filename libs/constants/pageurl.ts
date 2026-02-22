export const URLS = {
  AUTH: {
    LOGIN: '/',
    REGISTER: '/create-account',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_OTP: '/verify-otp',
    CREATE_NEW_PASSWORD: '/create-new-password',
  },
  DASHBOARD: {
      DASHBOARD: '/dashboard',
      USERS: '/users',
      PROJECTS: '/projects',
      BID: '/bids',
      PROPERTIES: '/properties',
      TRANSACTIONS: '/transactions',
      DOCUMENTS: '/documents',
      MEETING: '/meetings',
      SUPPORT: '/support',
      SETTINGS: '/settings',
    }
} as const;
