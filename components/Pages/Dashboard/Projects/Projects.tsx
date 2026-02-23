import Button from "@/components/ui/Button/Button";
import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { URLS } from "@/libs/constants/pageurl";
import CalendarHeader from "@/components/ui/Datepicker";
import ProjectTable from "./Table";
import ProjectMetrics from "./ProjectMetrics";
import { PlusIcon } from "lucide-react";
import ActionButton from "@/components/ui/Button/ActionButton";
import { useProjects } from "@/libs/hooks/useProjects";

const Projects = () => {
  
  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.PROJECTS}>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold ">Project Management</p>
          <p className="text-sm py-2">
            Oversee construction projects and milestone tracking
          </p>
        </div>
      </div>
        
        
        <div>
          <ProjectTable/>
        </div>
    </DashboardLayout>
  );
};

export default Projects;
