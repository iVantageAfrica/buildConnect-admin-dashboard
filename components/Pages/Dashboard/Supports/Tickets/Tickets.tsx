import { DataTable } from "@/components/ui/Datatable";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Tickets() {
  const [activeTab, setActiveTab] = useState('All Statuses');

  const allTickets = [
    { id: 1, ticket: 'Login not working after password reset.', ticketId: '#BC-10245', user: 'Mike Chen', userType: 'Builder', createdDate: '17/05/2025', status: 'Pending', priority: 'Medium' },
    { id: 2, ticket: 'Login not working after password reset.', ticketId: '#BC-10245', user: 'Mike Chen', userType: 'Client', createdDate: '17/05/2025', status: 'Rejected', priority: 'High' },
    { id: 3, ticket: 'Login not working after password reset.', ticketId: '#BC-10245', user: 'Mike Chen', userType: 'Client', createdDate: '17/05/2025', status: 'Approved', priority: 'Low' },
    { id: 4, ticket: 'Login not working after password reset.', ticketId: '#BC-10245', user: 'Mike Chen', userType: 'Builder', createdDate: '17/05/2025', status: 'Pending', priority: 'Medium' },
    { id: 5, ticket: 'Login not working after password reset.', ticketId: '#BC-10245', user: 'Mike Chen', userType: 'Client', createdDate: '17/05/2025', status: 'Approved', priority: 'Low' },
    { id: 6, ticket: 'Unable to upload documents', ticketId: '#BC-10246', user: 'Sarah Johnson', userType: 'Builder', createdDate: '16/05/2025', status: 'Open', priority: 'High' },
    { id: 7, ticket: 'Payment not reflecting', ticketId: '#BC-10247', user: 'David Lee', userType: 'Client', createdDate: '16/05/2025', status: 'In Review', priority: 'High' },
    { id: 8, ticket: 'Profile update issue', ticketId: '#BC-10248', user: 'Emma Wilson', userType: 'Builder', createdDate: '15/05/2025', status: 'Resolved', priority: 'Low' },
  ];

  const tabs = [
    { name: 'All Statuses', count: allTickets.length },
    { name: 'Open', count: allTickets.filter(t => t.status === 'Open').length },
    { name: 'In Review', count: allTickets.filter(t => t.status === 'In Review').length },
    { name: 'Resolved', count: allTickets.filter(t => t.status === 'Resolved').length },
  ];

  const filteredTickets = activeTab === 'All Statuses' 
    ? allTickets 
    : allTickets.filter(t => t.status === activeTab);

  const columns = [
    {
      key: 'ticket',
      header: 'Ticket',
      render: (row) => (
        <div>
          <div className="text-gray-900 font-medium">{row.ticket}</div>
          <div className="text-gray-500 text-sm">Ticket ID: {row.ticketId}</div>
        </div>
      )
    },
    {
      key: 'user',
      header: 'User',
      render: (row) => (
        <div>
          <div className="text-gray-900">{row.user}</div>
          <div className="text-gray-500 text-sm">{row.userType}</div>
        </div>
      )
    },
    {
      key: 'createdDate',
      header: 'Created Date',
      render: (row) => <span className="text-gray-900">{row.createdDate}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === 'Approved' || row.status === 'Resolved'
            ? 'bg-green-100 text-green-700'
            : row.status === 'Rejected'
            ? 'bg-red-100 text-red-700'
            : row.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-700'
            : row.status === 'Open'
            ? 'bg-gray-100 text-gray-700'
            : 'bg-blue-100 text-blue-700'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => <span className="text-gray-900">{row.priority}</span>
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: <Eye className="w-4 h-4 text-gray-600" />,
      onClick: (row) => alert(`Viewing ticket: ${row.ticket}`)
    },
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4 text-blue-600" />,
      onClick: (row) => alert(`Editing ticket: ${row.ticket}`)
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4 text-red-600" />,
      onClick: (row) => {
        if (confirm(`Delete ticket: ${row.ticket}?`)) {
          alert('Ticket deleted!');
        }
      }
    }
  ];

  return (
    <div className=" min-h-screen">
 

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and respond to user support requests</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
            <span className="text-xl">+</span>
            Create Ticket
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === tab.name
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab.name}
                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                  activeTab === tab.name
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ticket title or user..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <DataTable 
          columns={columns}
          data={filteredTickets}
          actions={actions}
          rowsPerPageOptions={[5, 8, 10, 20]}
          defaultRowsPerPage={5}
          showSerialNumber={true}
        />
      </div>
    </div>
  );
}