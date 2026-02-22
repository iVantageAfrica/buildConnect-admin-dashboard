// hooks/useTokenExpiry.ts
import { useEffect } from 'react';
import { useAuthStore } from '../store/Authstore';


export const useTokenExpiry = () => {
  const { authToken, setSessionExpired } = useAuthStore();

  useEffect(() => {
    if (!authToken?.expiresAt) return;

    const checkExpiry = () => {
      const expiryTime = new Date(authToken.expiresAt).getTime();
      const currentTime = new Date().getTime();
      const twelveMinutes = 12 * 60 * 1000; 

      if (expiryTime - currentTime < twelveMinutes) {
        setSessionExpired(true);
      }
    };

 
    const interval = setInterval(checkExpiry, 60000);
    checkExpiry();

    return () => clearInterval(interval);
  }, [authToken, setSessionExpired]);
};