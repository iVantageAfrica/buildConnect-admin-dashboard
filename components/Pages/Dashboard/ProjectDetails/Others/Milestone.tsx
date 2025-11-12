import { DataTable } from "@/components/ui/Datatable";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Milestones() {
  const router = useRouter();

  const handleClick = (row: any) => {
    const id = row.id;
    router.push(`/milestone-details/${id}`);
  };

  const allProjects = [
    { id: 1, title: "Foundation", description: "Excavation, footing and concrete works", status: "completed", amount: "N15,000", duedate: "23/2025" },
    { id: 2, title: "Roofing", description: "Roof truses and covering installations", status: "pending", amount: "N20,000", duedate: "27/2026"},

  ];

  const columns = [
    { key: "title", header: "Title", render: row  => <span>{row.title}</span> },
    { key: "description", header: "Description", render: row => <span>{row.description}</span> },
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
    { key: "amount", header: "Amount", render: row => <span>{row.amount}</span> },
    { key: "duedate", header: "Due Date", render: row => <span>{row.duedate}</span> },
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
