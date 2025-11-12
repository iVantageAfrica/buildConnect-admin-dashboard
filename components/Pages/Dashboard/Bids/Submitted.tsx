import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { DataTable } from "@/components/ui/Datatable";
import { AlertCircle, AlertTriangle, Building2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";


export default function SubmittedBids() {
  const router = useRouter();

  const handleClick = (row: any) => {
    const id = row.id;
    router.push(`/milestone-details/${id}`);
  };

   const allProjects = [
    { id: 1, project: "ABC Construction", builder: "Mike Chan", bidamount: "800", documents: "1 files", submittteddate: "23/2025",  status:"pending"},
    { id: 2, project: "Express Builders ", builder: "Lola rae", bidamount: "900", documents: "2 files", submitteddate: "27/2026", status:"pending"},
  ];

  const columns = [
    { key: "project", header: "Projects", render: row  => <span>{row.project}</span> },
    { key: "builder", header: "Builder", render: row => <span>{row.builder}</span> },
  { key: "bidamount", header: "Bid Amount", render: row => <span>{row.bidamount}</span> },
    { key: "documents", header: "Documents", render: row => <span>{row.documents}</span> },
        { key: "submitteddate", header: "Submittted Date", render: row => <span>{row.submitteddate}</span> },
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
      label: 'Total Bids',
      value: '20',
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'Pending Review',
      value: '9',
  
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Approved',
      value: '8',
  
      isPositive: true
    },
     {
      icon: AlertTriangle,
      label: 'Rejected',
      value: '8',
  
      isPositive: true
    }
  ];

  return (
    <div className="bg-gray-50 ">
        <div>
            <p className="text-2xl font-bold">
            Submitted Bids
            </p>
            <p className="text-md">Review and manage all submitted project bids</p>
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
