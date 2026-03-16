
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { PropertyService } from '../services/PropertyService';
import { MortgageService } from '../services/MortgageServices';



export const useMortgage = () => {
  const router = useRouter();
const { toast } = useToast();
  
 
const getMortgageQuery = ( params: object) => {
  return useQuery({
    queryKey: ['getMortgageQuery',  params], 
    queryFn: () => MortgageService.getMortgageApplications(params),
  });
};


 const singlePropertyQuery = (id :any) => {
    return useQuery({
      queryKey: ['singleMortgageQuery', id], 
      queryFn: () => MortgageService.singleMortgageApplications(id),
    });
  };


const updateMortgageStatus = useMutation({
      mutationFn: MortgageService.updateMortgageApplicationStatus,
      onSuccess: (data) => {
        toast.success("Success", "Update Mortgage Application Status");
      },
      onError: (error: any) => {
        toast.error("Error", "Failed to Update Mortgage Application Status");
      }
});

const updateMortgageDecision = useMutation({
      mutationFn: MortgageService.updateMortgageApplicationsDecision,
      onSuccess: (data) => {
        toast.success("Success", "Update Mortgage Decision");
      },
      onError: (error: any) => {
        toast.error("Error", "Failed to Update Mortgage Decision Status");
      }
});


  return { 
  getMortgageQuery,
  singlePropertyQuery,
 updateMortgageDecision,
 updateMortgageStatus
   };
};