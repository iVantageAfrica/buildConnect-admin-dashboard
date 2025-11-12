import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { DataTable } from "@/components/ui/Datatable";
import { Building2, CheckCircle, Clock, DollarSign } from "lucide-react";

export default function Projects() {
  const clientProjects = [
    { 
      id: 1, 
      projectName: "Villa Grande", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Completed"
    },
    { 
      id: 2, 
      projectName: "Ocean View", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Active"
    },
    { 
      id: 3, 
      projectName: "Villa Grande", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Completed"
    },
    { 
      id: 4, 
      projectName: "Ocean View", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Completed"
    },
    { 
      id: 5, 
      projectName: "Ocean View", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Completed"
    },
    { 
      id: 6, 
      projectName: "Villa Grande", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Active"
    },
    { 
      id: 7, 
      projectName: "Ocean View", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Active"
    },
    { 
      id: 8, 
      projectName: "Ocean View", 
      budget: "₦15,000,000.00", 
      location: "Ikoyi, Lagos",
      startDate: "17/01/2025",
      status: "Completed"
    },
  ];

  const columns = [
    { 
      key: "projectName", 
      header: "Project Name", 
      render: row => <span className="font-medium">{row.projectName}</span> 
    },
    { 
      key: "budget", 
      header: "Budget", 
      render: row => <span className="font-semibold text-gray-700">{row.budget}</span> 
    },
    { 
      key: "location", 
      header: "Location", 
      render: row => <span className="text-gray-600">{row.location}</span> 
    },
    { 
      key: "startDate", 
      header: "Start Date", 
      render: row => <span className="text-gray-600">{row.startDate}</span> 
    },
    {
      key: "status", 
      header: "Status", 
      render: row => (
        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === "Completed" ? "bg-green-100 text-green-700"
          : row.status === "Active" ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700"
        }`}>
          {row.status}
        </span>
      )
    },
  ];



  return (
    <div className="bg-gray-50">
      <div>
        <p className="text-2xl font-bold mb-4">
          Client Projects
        </p>

      </div>
 
      <div className="max-w-7xl mx-auto">
        <DataTable
          columns={columns}
          data={clientProjects}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={8}
          searchPlaceholder="Search projects..."
          searchableColumns={["projectName", "location"]}
          showSerialNumber={true}
        />
      </div>
    </div>
  );
}