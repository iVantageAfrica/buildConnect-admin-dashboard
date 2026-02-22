import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { useAuthStore } from '../store/Authstore';
import { AuthService } from '../services/AuthServices';
import { handleApiError } from '../utils/handleapierror';
import { UserService } from '../services/UserServices';
// import { handleApiError } from '../utils/handleapierror';
// import { URLS } from '../constants/pageurl';
// import { encryptUrl } from '../utils/helpers';





export const useUsers = () => {
  const router = useRouter();
const { toast } = useToast();
  
const userQuery = (params: any) => {
  return useQuery({
    queryKey: ['users', params], 
    queryFn: () => UserService.getallusers(params),
  });
};

const singleUserQuery = (id :any) => {
    console.log(id)
  return useQuery({
    queryKey: ['singleuser', id], 
    queryFn: () => UserService.getSingleUser(id),
  });
};

const singleBuilderQuery = (id: string) => {
    return useQuery({
      queryKey: ['builder', id], // Different query key
      queryFn: () => UserService.getSingleUser(id), // Same service method
      enabled: !!id,
    });
  };

const activityQuery = (id :string, params: object) => {
  return useQuery({
    queryKey: ['activityuser', id, params], 
    queryFn: () => UserService.getActivity(id, params),
  });
};

const bidQuery = (id :string, params: object) => {
  return useQuery({
    queryKey: ['activityuser', id, params], 
    queryFn: () => UserService.getBids(id, params),
  });
};
 
const projectsQuery = (id :string, params: object) => {
  return useQuery({
    queryKey: ['projectquery',  params], 
    queryFn: () => UserService.getProjects(id, params),
  });
};

const documentsQuery = (id :string, params: object) => {
  return useQuery({
    queryKey: ['documents',  params], 
    queryFn: () => UserService.getDocuments(id, params),
  });
};

 const createClientMutation = useMutation({
    mutationFn: UserService.createClients,
    onSuccess: (data) => {
      toast.success("Success", "Client created successfully");
    //   onClose();
    //   methods.reset();
    //   onSuccess?.();
    },
    onError: (error: any) => {
      toast.error("Error", "Failed to create client");
      console.error('Create client error:', error);
    }
  });

  

   const createBuildersMutation = useMutation({
    mutationFn: UserService.createBuilders,
    onSuccess: (data) => {
      toast.success("Success", "Client created successfully");
    //   onClose();
    //   methods.reset();
    //   onSuccess?.();
    },
    onError: (error: any) => {
      toast.error("Error", "Failed to create client");
      console.error('Create client error:', error);
    }
  });

  return { 
    userQuery,
    singleUserQuery,
    activityQuery,
    projectsQuery,
    documentsQuery,
    singleBuilderQuery,
    createClientMutation,
    createBuildersMutation,
    bidQuery
   };
};