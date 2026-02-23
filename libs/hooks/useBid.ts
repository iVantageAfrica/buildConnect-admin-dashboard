import { BidService } from './../services/BidService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from './usetoast';
import { ProjectService } from '../services/ProjectServices';



export const useBid = () => {

const { toast } = useToast();
  
 
const expressionOfInterestMutation = ( params: object) => {
  return useQuery({
    queryKey: ['expressionofinterestmutation',  params], 
    queryFn: () => BidService.expressionInterest(params),
  });
};

const bidInvitationQuery = ( params: object) => {
  return useQuery({
    queryKey: ['bidInvitationQuery',  params], 
    queryFn: () => BidService.bidInvitations(params),
  });
};

const submittedQuery = ( params: object) => {
  return useQuery({
    queryKey: ['ubmittedQuery',  params], 
    queryFn: () => BidService.submittedBids(params),
  });
};


  

  return { 
  expressionOfInterestMutation,
  bidInvitationQuery,
  submittedQuery
  
   };
};