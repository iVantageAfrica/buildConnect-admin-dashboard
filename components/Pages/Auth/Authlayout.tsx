import { AmanwithBuildingPlan, BuildConnectLogo } from "@/libs/constants/image";
import Image, { StaticImageData } from "next/image";
import React, {  ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
image: string | StaticImageData;
}

const Authlayout: React.FC<AuthLayoutProps> = ({ children, image }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="">
        <div className="mb-4 pl-45">
          <Image src={BuildConnectLogo} alt="BuildConnect logo" className="" />
        </div>
        <div className="flex flex-col justify-center bg-white mt-20 py-12 sm:px-12 xl:pl-55">
          <div className="max-w-md w-full">{children}</div>
        </div>
      </div>

      <div className="relative my-4">
        <Image
          src={image}
          alt="Construction worker with building plan"
          fill
          className="w-[560px]"
          priority
        />
      </div>
    </div>
  );
};

export default Authlayout;
