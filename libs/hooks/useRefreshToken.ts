// hooks/useRefreshToken.ts
import { useMutation } from '@tanstack/react-query';
import { useToast } from './usetoast';
import { AuthService } from '../services/AuthServices';
import { handleApiError } from '../utils/handleapierror';


export const useRefreshToken = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: AuthService.refreshtoken,
    onSuccess: (data: any) => {
      if (data?.data?.statusCode === 200) {
        const newTokens = data.data.data;
        console.log('Token refreshed successfully');
      }
    },
    onError: (error: any) => {
   
       handleApiError(error, "Refresh Token error", toast);
    }
  });
};