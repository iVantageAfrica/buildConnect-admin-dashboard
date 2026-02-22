
// import { createAdminForm } from '@/lib/schemas/dashboardschema';
import { createAdminForm } from '@/lib/schemas/dashboardschema';
import { APIURLS } from '../../../lib/constants/apiurl';
import axiosInstance from '../../../lib/utils/axios';

export const DashboardService = {
  createRoles: (data: createAdminForm) => axiosInstance.post(APIURLS.DASHBOARD.ROLES, data),
  createAdmin: (data: createAdminForm) => axiosInstance.post(APIURLS.DASHBOARD.ADMIN, data),
  getAdmin: () => axiosInstance.get(APIURLS.DASHBOARD.ADMIN),
  getRoles: () => axiosInstance.get(APIURLS.DASHBOARD.ROLES),
  fliterUser: (data :string) => 
  axiosInstance.get(`${APIURLS.DASHBOARD.FILTERUSERS}${data}&count=10&page=1`),
  logout: () => axiosInstance.post('/auth/logout'),
};