
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { EscrowService } from '../services/EscrowService';



export const useEscrow = () => {
  const router = useRouter();
const { toast } = useToast();
  
 
const paymentInstructions = ( params: object) => {
  return useQuery({
    queryKey: ['paymentInstructions',  params], 
    queryFn: () => EscrowService.getPaymentInstructions(params),
  });
};


const getWalletFundingQuery = (params: object) => {
    return useQuery({
      queryKey: ['walletfunding', params], 
      queryFn: () => EscrowService.getWalletFunding(params),
    });
  };

   const updatePaymentInstructions = useMutation({
      mutationFn: EscrowService.updatePaymentInstructions,
      onSuccess: (data) => {
        toast.success("Success", "Update Payment Instructions");
      },
      onError: (error: any) => {
        toast.error("Error", "Failed to create Instructions");
        console.error('Create client error:', error);
      }
    });

     const updateWalletFunding = useMutation({
        mutationFn: EscrowService.updateWalletFunding,
        onSuccess: (data) => {
          toast.success("Success", "Update Wallet Funding");
        },
        onError: (error: any) => {
          toast.error("Error", "Failed to create client");
          console.error('Create client error:', error);
        }
      });

  

  return { 
  paymentInstructions,
  getWalletFundingQuery,
updatePaymentInstructions,
updateWalletFunding
   };
};