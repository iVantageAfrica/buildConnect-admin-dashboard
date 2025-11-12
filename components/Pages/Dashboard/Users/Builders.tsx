import Button from "@/components/ui/Button/Button";
import { DataTable } from "@/components/ui/Datatable";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Builders() {
  const [activeTab, setActiveTab] = useState('All Builders');
const router = useRouter();
  const allBuilders = [
    { id: 1, companyName: 'ABC Construction', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Verified' },
    { id: 2, companyName: 'Express Builders', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Pending' },
    { id: 3, companyName: 'ABC Construction', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Suspended' },
    { id: 4, companyName: 'Express Builders', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Flagged' },
    { id: 5, companyName: 'Quality Build Co.', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Verified' },
    { id: 6, companyName: 'ABC Construction', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Suspended' },
    { id: 7, companyName: 'Modern Build Co.', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Pending' },
    { id: 8, companyName: 'Quality Build Co.', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Flagged' },
    { id: 9, companyName: 'Prime Construction', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Verified' },
    { id: 10, companyName: 'Elite Builders Ltd.', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Pending' },
    { id: 11, companyName: 'Superior Construction', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Flagged' },
    { id: 12, companyName: 'Master Builders Inc.', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Suspended' },
    { id: 13, companyName: 'Skyline Builders', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Verified' },
    { id: 14, companyName: 'Foundation Works', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Pending' },
    { id: 15, companyName: 'Zenith Construction', contactPerson: 'Mike Chen', phoneNumber: '08147230127', email: 'Smi_12@gmail.com', status: 'Suspended' },
  ];

  const tabs = [
    { name: 'All Builders', count: allBuilders.length },
    { name: 'Verified', count: allBuilders.filter(b => b.status === 'Verified').length },
    { name: 'Pending', count: allBuilders.filter(b => b.status === 'Pending').length },
    { name: 'Flagged', count: allBuilders.filter(b => b.status === 'Flagged').length },
    { name: 'Suspended', count: allBuilders.filter(b => b.status === 'Suspended').length },
  ];

  const filteredBuilders = activeTab === 'All Builders' 
    ? allBuilders 
    : allBuilders.filter(b => b.status === activeTab);

  const handleClick = (row: any) => {
     const id = row.activity ?? 1;
    router.push(`/builder-details/${id}`);
  };
const actions = [
    {
      label: 'View',
      icon:   <Button className='bg-blue-300 mb-2 p-1.5 text-white'>View</Button>,
      onClick: (row :any) => handleClick(row)
    },
  
  ];
  const columns = [
    {
      key: 'companyName',
      header: 'Company Name',
      render: (row) => <span className="text-gray-900 font-medium">{row.companyName}</span>
    },
    {
      key: 'contactPerson',
      header: 'Contact Person',
      render: (row) => <span className="text-gray-900">{row.contactPerson}</span>
    },
    {
      key: 'phoneNumber',
      header: 'Phone Number',
      render: (row) => <span className="text-gray-900">{row.phoneNumber}</span>
    },
    {
      key: 'email',
      header: 'Email Address',
      render: (row) => <span className="text-gray-900">{row.email}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === 'Verified' 
            ? 'bg-green-100 text-green-700'
            : row.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-700'
            : row.status === 'Flagged'
            ? 'bg-orange-100 text-orange-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  // const actions = [
  //   {
  //     label: 'View',
  //     icon: <Eye className="w-4 h-4 text-gray-600" />,
  //     onClick: (row) => alert(`Viewing builder: ${row.companyName}`)
  //   },
  //   {
  //     label: 'Edit',
  //     icon: <Edit className="w-4 h-4 text-blue-600" />,
  //     onClick: (row) => alert(`Editing builder: ${row.companyName}`)
  //   },
  //   {
  //     label: 'Delete',
  //     icon: <Trash2 className="w-4 h-4 text-red-600" />,
  //     onClick: (row) => {
  //       if (confirm(`Delete builder: ${row.companyName}?`)) {
  //         alert('Builder deleted!');
  //       }
  //     }
  //   }
  // ];

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Builders</h1>
        
        <div className="flex gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.name
                  ? tab.name === 'Verified'
                    ? 'bg-green-100 text-green-700'
                    : tab.name === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : tab.name === 'Flagged'
                    ? 'bg-orange-100 text-orange-700'
                    : tab.name === 'Suspended'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.name}
              <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                activeTab === tab.name
                  ? tab.name === 'Verified'
                    ? 'bg-green-200 text-green-800'
                    : tab.name === 'Pending'
                    ? 'bg-yellow-200 text-yellow-800'
                    : tab.name === 'Flagged'
                    ? 'bg-orange-200 text-orange-800'
                    : tab.name === 'Suspended'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <DataTable 
          columns={columns}
          data={filteredBuilders}
          actions={actions}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={8}
          showSerialNumber={true}
        />
      </div>
    </div>
  );
}