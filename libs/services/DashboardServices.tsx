import { APIURLS } from "../constants/apiurl";
import axiosInstance from "../utils/axios";


export const DashboardService = {
  getAnalytics: () => axiosInstance.get(APIURLS.DASHBOARD.INDEX.DASHBOARDANALYTICS),
  getRecentActivity: () => axiosInstance.get(APIURLS.DASHBOARD.INDEX.RECENTACTIVITY),
};