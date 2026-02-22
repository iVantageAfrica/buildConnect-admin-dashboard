import Button from '@/components/ui/Button/Button';
import { DataTable } from '@/components/ui/Datatable';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useUsers } from '@/libs/hooks/useUsers';
import { UserDetailsProps } from '../../UserDetails/UserDetails';

const Bids = ({ id }: UserDetailsProps) => {
  const router = useRouter();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { bidQuery } = useUsers();
  const { data, isLoading, error } = bidQuery(id, { 
    page: 1, 
    limit: 100,
    id: id
  });   
  
  const bids = data?.data?.data || [];
  console.log('Bids data:', bids);

  const tableData = bids.map((bid: any) => ({
    id: bid.id,
    projectTitle: bid.projectTitle,
    projectId: bid.projectId,
    bidAmount: `₦${bid.bidAmount?.toLocaleString() || '0'}`,
    status: bid.status,
    submittedAt: new Date(bid.submittedAt).toLocaleDateString(),
  }));

  const handleClick = (row: any) => {
    const id = row.id; 
    router.push(`/bid-details/${id}`);
  };

  const actions = [
    {
      label: 'View',
      icon: (
        <div className="bg-blue-700 hover:bg-blue-700 text-white rounded-md mb-2 px-3 py-1.5 text-sm cursor-pointer transition">
          View
        </div>
      ),
      onClick: (row: any) => handleClick(row),
    },
  ];

  const columns = [
    { key: 'projectTitle', header: 'Project Title' },
    { key: 'projectId', header: 'Project ID' },
    { key: 'bidAmount', header: 'Bid Amount' },
    { key: 'status', header: 'Status' },
    { key: 'submittedAt', header: 'Submitted Date' },
  ];


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading bids...</span>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading bids: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bids</h1>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        actions={actions}
        showSearch={true}
        searchPlaceholder="Search bids..."
        searchableColumns={['projectTitle', 'projectId', 'status']}
        isLoading={isLoading}
      />
    </>
  );
};

export default Bids;