// providers/SessionProvider.tsx
import React, { ReactNode } from 'react';

import { useTokenExpiry } from '../hooks/useTokenExpiryChecker';
import SessionExpiredModal from '@/components/ui/modals/SessionExpireModal';


export const SessionProvider = ({ children }: { children: ReactNode }) => {
  useTokenExpiry(); // This will check token expiry every minute

  return (
    <>
      {children}
      <SessionExpiredModal />
    </>
  );
};