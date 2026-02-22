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

export const BidService = {

  expressionInterest: (id: any,): Promise<User> => 
    axiosInstance.get(`${APIURLS.DASHBOARD.BIDS}/expressions-of-interest`),
  totalEOI: (id: any,): Promise<User> => 
    axiosInstance.get(`${APIURLS.DASHBOARD.PROJECTS}/meetings/${id}/meetings`),
};

