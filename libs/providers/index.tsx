"use client";

// import { useInitialRender } from "../hooks/useInitialRender";
import ProtectedLayout from "./Protectedlayout";
import { QueryProvider } from "./QueryProviders";
import { SessionProvider } from "./setSessionProvider";
import { ToastProvider } from "./Toast";





export function Providers({ children }: { children: React.ReactNode }) {
  // const isInitialRenderComplete = useInitialRender();

  // if (!isInitialRenderComplete) return null;

  return (
     <QueryProvider>
      <ToastProvider>
         {/* <SessionProvider> */}
  
        {children}
  {/* </SessionProvider> */}
        </ToastProvider>
    
     </QueryProvider>
  );
}