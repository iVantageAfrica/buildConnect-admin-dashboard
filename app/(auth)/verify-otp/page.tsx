import { Suspense } from "react";
import VerifyOtp from '@/components/Pages/Auth/VerifyOtp/VerifyOtp'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}