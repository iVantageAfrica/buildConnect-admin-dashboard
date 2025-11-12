import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { DataTable } from "@/components/ui/Datatable";
import { AlertCircle, AlertTriangle, Building2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";


export default function EOI() {
  const router = useRouter();

  const handleClick = (row: any) => {
    const id = row.id;
    router.push(`/project-bid-details/${id}`);
  };

    const allProjects = [
    { id: 1, project: "ABC Construction", builder: "Mike Chan", interestlevel: "80%", status: "pending", submittteddate: "23/2025" },
    { id: 2, project: "Express Builders ", builder: "Lola rae", interestlevel: "90%", status: "pending", submitteddate: "27/2026"},
  ];

  const columns = [
    { key: "project", header: "Projects", render: row  => <span>{row.projects}</span> },
    { key: "builder", header: "Builder", render: row => <span>{row.builder}</span> },
        { key: "interestlevel", header: "Interest Level", render: row => <span>{row.interestlevel}</span> },
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
    { key: "submitteddate", header: "Submittted Date", render: row => <span>{row.submitteddate}</span> },
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
      label: 'Total EOIs',
      value: '24',
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'This week',
      value: '9',
  
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Unique Projects',
      value: '8',
  
      isPositive: true
    },
  ];

  return (
    <div className="bg-gray-50 ">
        <div>
            <p className="text-2xl font-bold">
            Expressions of interest
            </p>
            <p className="text-md">Review builder expressions of interest for upcoming projects</p>
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
