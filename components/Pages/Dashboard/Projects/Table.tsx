import { DataTable } from "@/components/ui/Datatable";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectTable() {
  const router = useRouter();

  const handleClick = (row: any) => {
    const id = row.id;
    router.push(`/project-details/${id}`);
  };

  const allProjects = [
    { id: 1, project: "ABC Construction", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Active", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 2, project: "Express Builders", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Bidding", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 3, project: "ABC Construction", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Bidding", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 4, project: "Express Builders", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Verified", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 5, project: "Quality Build Co.", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Active", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 6, project: "ABC Construction", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Bidding", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 7, project: "Prime Developers", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Active", budget: "₦15,000,000", startDate: "17/01/2025" },
    { id: 8, project: "Summit Construction", client: "Mrs Tracy C.", builder: "Mike Chen", status: "Verified", budget: "₦15,000,000", startDate: "17/01/2025" },
  ];

  const columns = [
    { key: "project", header: "Project", render: row => <span>{row.project}</span> },
    { key: "client", header: "Client", render: row => <span>{row.client}</span> },
    { key: "builder", header: "Builder", render: row => <span>{row.builder}</span> },
    {
      key: "status", header: "Status", render: row => (
        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === "Active" ? "bg-green-100 text-green-700"
          : row.status === "Bidding" ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700"
        }`}>
          {row.status}
        </span>
      )
    },
    { key: "budget", header: "Budget", render: row => <span>{row.budget}</span> },
    { key: "startDate", header: "Start Date", render: row => <span>{row.startDate}</span> },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4 text-gray-600" />,
      onClick: (row: any) => handleClick(row)
    },
  ];

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <DataTable
          columns={columns}
          data={allProjects}
          actions={actions}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={8}
         searchPlaceholder="...search"
         searchableColumns={[]}
          showSerialNumber={true}
        />
      </div>
    </div>
  );
}
