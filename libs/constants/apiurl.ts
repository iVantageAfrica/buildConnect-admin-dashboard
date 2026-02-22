

export const APIURLS = {

    AUTH: {
      LOGIN: 'auth/login',
      REGISTER: 'auth/signup',
      FORGOT_PASSWORD: '/auth/forgot-password',
      VERIFYOTP: '/auth/verify-reset-otp',
      RESENDOTP: '/auth/resend-reset-otp',
      CHANGEPASSWORD: '/auth/reset-password',
      REFRESHTOKEN: '/auth/reset-token'
    },
     DASHBOARD: {
    USERS: '/admin/users',
    PROJECTS: '/admin/projects',
    BIDS: '/admin/bids',
    DOCUMENTS: '/admin/documents',
    MEETINGS: '/admin/meetings',
    UPLOAD: {
    PREPARE_UPLOAD: "admin/files/prepare",
    CONFIRM_UPLOAD: (fileId: string) => `admin/files/${fileId}/confirm`,
  },
    },
 
} as const;