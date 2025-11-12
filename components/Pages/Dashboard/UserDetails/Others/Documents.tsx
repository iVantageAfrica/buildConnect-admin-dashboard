
import { DataTable } from "@/components/ui/Datatable";
import {  Eye, Download } from "lucide-react";

export default function Documents() {
  const clientDocuments = [
    { 
      id: 1, 
      documentName: "Identity Verification", 
      type: "ID Document", 
      status: "Verified",
      uploadDate: "17/01/2025"
    },
    { 
      id: 2, 
      documentName: "Income Proof", 
      type: "Financial Document", 
      status: "Pending",
      uploadDate: "17/01/2025"
    },
    { 
      id: 3, 
      documentName: "Identity Verification", 
      type: "ID Document", 
      status: "Rejected",
      uploadDate: "17/01/2025"
    },
    { 
      id: 4, 
      documentName: "Property Deed", 
      type: "Property Document", 
      status: "Verified",
      uploadDate: "17/01/2025"
    },
    { 
      id: 5, 
      documentName: "Identity Verification", 
      type: "ID Document", 
      status: "Verified",
      uploadDate: "17/01/2025"
    },
    { 
      id: 6, 
      documentName: "Income Proof", 
      type: "Financial Document", 
      status: "Rejected",
      uploadDate: "17/01/2025"
    },
    { 
      id: 7, 
      documentName: "Property Deed", 
      type: "Property Document", 
      status: "Pending",
      uploadDate: "17/01/2025"
    },
    { 
      id: 8, 
      documentName: "Identity Verification", 
      type: "ID Document", 
      status: "Verified",
      uploadDate: "17/01/2025"
    },
  ];

  const columns = [
    { 
      key: "documentName", 
      header: "Document Name", 
      render: row => <span className="font-medium">{row.documentName}</span> 
    },
    { 
      key: "type", 
      header: "Type", 
      render: row => <span className="text-gray-600">{row.type}</span> 
    },
    {
      key: "status", 
      header: "Status", 
      render: row => (
        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === "Verified" ? "bg-green-100 text-green-700"
          : row.status === "Pending" ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: "uploadDate", 
      header: "Upload Date", 
      render: row => <span className="text-gray-600">{row.uploadDate}</span> 
    },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="w-4 h-4 text-gray-600" />,
      onClick: (row: any) => console.log("View document:", row)
    },
    {
      label: "Download",
      icon: <Download className="w-4 h-4 text-gray-600" />,
      onClick: (row: any) => console.log("Download document:", row)
    },
  ];


  return (
    <div className="bg-gray-50">
      <div>
        <p className="text-2xl font-bold mb-4">
          Client Documents
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <DataTable
          columns={columns}
          data={clientDocuments}
          actions={actions}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={8}
          searchPlaceholder="Search documents..."
          searchableColumns={["documentName", "type"]}
          showSerialNumber={true}
        />
      </div>
    </div>
  );
}