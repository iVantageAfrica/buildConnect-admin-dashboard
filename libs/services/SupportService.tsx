import { APIURLS } from "../constants/apiurl";
import axiosInstance from "../utils/axios";


interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'builder';
  status: 'verified' | 'pending' | 'rejected';
  phone?: string;
  createdAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const SupportService = {

    getTickets: (id: any,): Promise<User> => 
    axiosInstance.get(`${APIURLS.DASHBOARD.SUPPORT.SUPPORT}/tickets`),
    createTickets: (data: any,): Promise<User> => 
    axiosInstance.get(`${APIURLS.DASHBOARD.SUPPORT.SUPPORT}/tickets`, data),
    // submittedBids: (id: any,): Promise<User> => 
    // axiosInstance.get(`${APIURLS.DASHBOARD.BIDS}/submitted`),
};