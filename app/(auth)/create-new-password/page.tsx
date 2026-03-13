import { Suspense } from "react";
import CreateNewPassword from '@/components/Pages/Auth/CreateNewPassword/CreateNewPassword'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPassword />
    </Suspense>
  );
}