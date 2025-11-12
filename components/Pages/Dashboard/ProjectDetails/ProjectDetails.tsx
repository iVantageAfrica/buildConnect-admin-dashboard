import { ArrowLeft, User, Building2, DollarSign, Calendar } from "lucide-react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { URLS } from "@/libs/constants/pageurl";
import { ProgressBar } from "@/components/ui/Custom/ProgressBar";
import Otherdetails from "./Others/Otherdetails";
import BackButton from "@/components/ui/BackButton";
import { InfoGrid, InfoItem } from "@/components/ui/Custom/Infogrid";

const ProjectDetails = () => {
    const projectInfo: InfoItem[] = [
    {
      icon: User,
      label: 'Client',
      value: 'Mrs Tracy C.'
    },
    {
      icon: Building2,
      label: 'Builder',
      value: 'Mike Chen'
    },
    {
      icon: DollarSign,
      label: 'Budget',
      value: '₦15,000,000'
    },
    {
      icon: Calendar,
      label: 'Timeline',
      value: 'Feb 13, 2025 - Jan 30, 2026'
    }
  ];
  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.PROJECTS}>
      <div className=" bg-gray-50 ">
        <div className="">
        <BackButton label="Back" />
          <div className="  p-4">
            <div className="flex  justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Sunrise Shopping Plaza
                  </h1>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-md">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Project ID: daf52109-a0bd-4db8-9c26-afa04cd79207
                </p>
              </div>

              <div className="text-right">
                <ProgressBar progress={100} label="Foundation" />
              </div>
            </div>

          <InfoGrid items={projectInfo} />
          </div>
          <Otherdetails/>
        .</div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
