"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import UniversalLoader from "@/components/ui/Custom/universalloader";
import { useToast } from "../hooks/UI/usetoast";
import { URLS } from "../constants/url";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated =  sessionStorage.getItem("authToken");
  const [loading, setLoading] = useState(true);
     const { toast } = useToast(); 
  const publicRoutes = useMemo(
    () => [URLS.AUTH.PERSONAL.LOGIN, URLS.AUTH.PERSONAL.REGISTER, URLS.AUTH.PERSONAL.FORGOT_PASSWORD, "/reset-password", "/"],
    []
  );

  useEffect(() => {
    if (publicRoutes.includes(pathname)) {
      setLoading(false);
      return;
    }

    if (!isAuthenticated) {
      toast.error("Errror", "You are not authenticated")
        router.replace(URLS.AUTH.PERSONAL.LOGIN);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, pathname, router, publicRoutes]);

  if (typeof window === "undefined") {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center h-screen">
<UniversalLoader text={"loading"} reason={undefined}/>
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedLayout;
 