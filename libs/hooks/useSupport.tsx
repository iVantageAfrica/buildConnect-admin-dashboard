import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { SupportService } from '../services/SupportService';



export const useSupport = () => {
  const router = useRouter();
const { toast } = useToast();
  
 
const getTicketsQuery = ( params: object) => {
  return useQuery({
    queryKey: ['getTicketsQuery',  params], 
    queryFn: () => SupportService.getTickets(params),
  });
 };

const createTicketMutation = useMutation({
    mutationFn: SupportService.createTickets,
    onSuccess: (data) => {
      toast.success("Success", "Tickets created successfully");
    },
    onError: (error: any) => {
      toast.error("Error", "Failed to create client");
      console.error('Create client error:', error);
    }
  });

  return { 
   getTicketsQuery,
   createTicketMutation
   };
};