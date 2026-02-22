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

export const DocumentService = {

   getDocuments: (data: any,): Promise<User> => 
    axiosInstance.get(`${APIURLS.DASHBOARD.DOCUMENTS}/`),
    createDocuments: (data: any,): Promise<User> => 
    axiosInstance.get(`${APIURLS.DASHBOARD.DOCUMENTS}/`, data),
};