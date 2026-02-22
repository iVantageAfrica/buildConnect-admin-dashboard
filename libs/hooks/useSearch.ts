import { Search } from 'lucide-react';
import { AuthService, searchService } from '@/services/services';
import { useAuthStore } from '@/store/Authstore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { handleApiError } from '@/utils/handleapierror';



export const useSearch = () => {
  const router = useRouter();
  const {setAuthData} = useAuthStore();
const { toast } = useToast();



 const search = useMutation({
  mutationFn: searchService.search,
  onSuccess: (data: any) => {
   console.log(data);
  },
  onError: (error: any) => {
     handleApiError(error, "Forgot Password", toast);
  }
});


  //   mutationFn: AuthService.logout,
  //   onSuccess: () => {
  //     clearUser();
  //     localStorage.removeItem('authToken');
  //     router.push('/login');
  //   },
  // });

//   const userProfileQuery = useQuery({
//   queryKey: ['userProfile', userId],
//   queryFn: () => UserService.getProfile(userId),
//   enabled: false, // wait for manual refetch
//   onSuccess: (response) => {
//     console.log('✅ User profile loaded:', response.data);
//     // Example: store user in global state, or redirect, etc.
//   },
//   onError: (error: any) => {
//     let errorMessage = "Failed to load profile.";
    
//     if (error.response) {
//       errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
//     } else if (error.request) {
//       errorMessage = "Network error. Please check your internet connection.";
//     }

//     alert(errorMessage);
//   }
// });


  return { 
    search, 
   };
};