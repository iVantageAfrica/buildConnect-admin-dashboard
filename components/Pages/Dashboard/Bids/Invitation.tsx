import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { DataTable } from "@/components/ui/Datatable";
import { AlertCircle, AlertTriangle, Building2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Invitation() {
  const router = useRouter();

  const handleClick = (row: any) => {
    const id = row.id;
    router.push(`/project-bid-details/${id}`);
  };

  const allProjects = [
    { id: 1, project: "ABC Construction", builderinvited: "Mike Chan", status: "pending", invitationdate: "23/2025", deadlinedate: "23/2025" },
    { id: 2, project: "Express Builders ", builderinvited: "Lola rae", status: "pending", invitationdate: "27/2026", deadlinedate: "27/2026"},
  ];

  const columns = [
    { key: "project", header: "Projects", render: row  => <span>{row.project}</span> },
    { key: "builderinvited", header: "Builder Invited", render: row => <span>{row.builderinvited}</span> },
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
    { key: "submitteddate", header: "Submittted Date", render: row => <span>{row.invitationdate}</span> },
        { key: "deadlinedate", header: "Deadline Date", render: row => <span>{row.deadlinedate}</span> },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4 text-gray-600" />,
      onClick: (row: any) => handleClick(row)
    },
  ];

   const metrics = [
    {
      icon: Building2,
      label: 'Total Sent',
      value: '24',
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'Viewed',
      value: '9',
  
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Responded',
      value: '8',
  
      isPositive: true
    },
     {
      icon: AlertTriangle,
      label: 'Pending',
      value: '8',
  
      isPositive: true
    }
  ];

  return (
    <div className="bg-gray-50 ">
        <div>
            <p className="text-2xl font-bold">
            Bid Invitations
            </p>
            <p className="text-md">Manage Invitations sent to builders for project bidding</p>
        </div>
        <MetricsCard metrics={metrics} />
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
