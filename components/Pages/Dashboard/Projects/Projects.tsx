import Button from "@/components/ui/Button/Button";
import React from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { URLS } from "@/libs/constants/pageurl";
import CalendarHeader from "@/components/ui/Datepicker";
import ProjectTable from "./Table";
import ProjectMetrics from "./ProjectMetrics";
import { PlusIcon } from "lucide-react";
import ActionButton from "@/components/ui/Button/ActionButton";

const Projects = () => {
  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.PROJECTS}>
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold ">Project Management</p>
          <p className="text-sm py-4">
            Oversee construction projects and milestone tracking
          </p>
        </div>

        <div className="">
        <ActionButton
          label="Add Project"
          icon={<PlusIcon />}
          href="/create-project"
        />
        </div>
      </div>
          <div className="pt-4">
            <CalendarHeader/>
        </div>
        <div>
      <ProjectMetrics/>
        </div>
        
        <div>
          <ProjectTable/>
        </div>
    </DashboardLayout>
  );
};

export default Projects;
