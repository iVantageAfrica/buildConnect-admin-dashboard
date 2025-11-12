import { DataTable } from "@/components/ui/Datatable";
import { Eye, Download, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DocumentReviewTable() {
  const [activeTab, setActiveTab] = useState('All Documents');

  const allDocuments = [
    { id: 1, name: 'Construction file.mpg', type: 'Contract', uploadDate: '17/05/2025', status: 'Pending', size: '8.7 MB' },
    { id: 2, name: 'Construction file.mpg', type: 'Property Document', uploadDate: '17/05/2025', status: 'Rejected', size: '8.7 MB' },
    { id: 3, name: 'Construction file.mpg', type: 'Business License', uploadDate: '17/05/2025', status: 'Pending', size: '8.7 MB' },
    { id: 4, name: 'Construction file.mpg', type: 'Identity', uploadDate: '17/05/2025', status: 'Rejected', size: '8.7 MB' },
    { id: 5, name: 'Construction file.mpg', type: 'Contract', uploadDate: '17/05/2025', status: 'Approved', size: '8.7 MB' },
    { id: 6, name: 'Construction file.mpg', type: 'Property Document', uploadDate: '17/05/2025', status: 'Rejected', size: '8.7 MB' },
    { id: 7, name: 'Construction file.mpg', type: 'Business License', uploadDate: '17/05/2025', status: 'Approved', size: '8.7 MB' },
    { id: 8, name: 'Construction file.mpg', type: 'Mike Chen', uploadDate: '17/05/2025', status: 'Pending', size: '8.7 MB' },
    { id: 9, name: 'Building permit.pdf', type: 'Contract', uploadDate: '16/05/2025', status: 'Approved', size: '5.2 MB' },
    { id: 10, name: 'Site plan.dwg', type: 'Property Document', uploadDate: '16/05/2025', status: 'Pending', size: '12.3 MB' },
    { id: 11, name: 'License copy.pdf', type: 'Business License', uploadDate: '15/05/2025', status: 'Approved', size: '3.1 MB' },
    { id: 12, name: 'ID verification.jpg', type: 'Identity', uploadDate: '15/05/2025', status: 'Rejected', size: '2.4 MB' },
  ];

  const tabs = [
    { name: 'All Documents', count: allDocuments.length },
    { name: 'Approved', count: allDocuments.filter(d => d.status === 'Approved').length },
    { name: 'Pending', count: allDocuments.filter(d => d.status === 'Pending').length },
    { name: 'Rejected', count: allDocuments.filter(d => d.status === 'Rejected').length },
  ];

  const filteredDocuments = activeTab === 'All Documents' 
    ? allDocuments 
    : allDocuments.filter(d => d.status === activeTab);


  const columns = [
    {
      key: 'name',
      header: 'Document Name',
      render: (row) => <span className="text-gray-900 font-medium">{row.name}</span>
    },
    {
      key: 'type',
      header: 'Type',
      render: (row) => <span className="text-gray-700">{row.type}</span>
    },
    {
      key: 'uploadDate',
      header: 'Upload Date',
      render: (row) => <span className="text-gray-700">{row.uploadDate}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === 'Approved' 
            ? 'bg-green-50 text-green-600'
            : row.status === 'Rejected'
            ? 'bg-red-50 text-red-600'
            : 'bg-yellow-50 text-yellow-600'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'size',
      header: 'Size',
      render: (row) => <span className="text-gray-700">{row.size}</span>
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: <Eye className="w-4 h-4 text-gray-600" />,
      onClick: (row) => alert(`Viewing document: ${row.name}`)
    },
    {
      label: 'Download',
      icon: <Download className="w-4 h-4 text-blue-600" />,
      onClick: (row) => alert(`Downloading: ${row.name}`)
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4 text-red-600" />,
      onClick: (row) => {
        if (confirm(`Delete document: ${row.name}?`)) {
          alert('Document deleted!');
        }
      }
    }
  ];

  return (

      <div className="max-w-7xl mx-auto">
       
        
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                activeTab === tab.name
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.name
                  ? tab.name === 'Rejected'
                    ? 'bg-red-100 text-red-700'
                    : tab.name === 'Pending'
                    ? 'bg-gray-100 text-gray-700'
                    : tab.name === 'Approved'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-gray-100 text-gray-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.name && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>

        <DataTable 
          columns={columns}
          data={filteredDocuments}
          actions={actions}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={8}
          showSerialNumber={true}
        />
      </div>

  );
}