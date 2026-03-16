
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { PropertyService } from '../services/PropertyService';



export const useProperty = () => {
  const router = useRouter();
const { toast } = useToast();
  
 
const getPropertiesQuery = ( params: object) => {
  return useQuery({
    queryKey: ['getPropertiesQuery',  params], 
    queryFn: () => PropertyService.getProperties(params),
  });
};


 const singlePropertyQuery = (id :any) => {
    return useQuery({
      queryKey: ['singlePropertyQuery', id], 
      queryFn: () => PropertyService.singleProperties(id),
    });
  };

   const updatePropertyStatus = useMutation({
      mutationFn: PropertyService.updatePropertyStatus,
      onSuccess: (data) => {
        toast.success("Success", "Update Property Status");
      },
      onError: (error: any) => {
        toast.error("Error", "Failed to Update Property Status");
      }
    });

  

  return { 
  getPropertiesQuery,
  singlePropertyQuery,
  updatePropertyStatus 
   };
};