import { DataTable } from '@/components/ui/Datatable';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';
import Addclient from './Addclient/Addclient';
import { useUsers } from '@/libs/hooks/useUsers';

const COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email Address' },
  { key: 'phonenumber', header: 'Phone Number' },
  { key: 'location', header: 'Location' },
  { key: 'projects', header: 'Projects' },
  { key: 'verificationStatus', header: 'Status' },
];

const Clients = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const { userQuery } = useUsers();
  const { data, isLoading, error } = userQuery({ page, limit, role: 'client' });

  const users = data?.data?.data || [];

  const totalCount: number = data?.data?.meta?.totalDocuments ?? 0;

  const tableData = useMemo(
    () =>
      users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phonenumber: user.phoneNumber,
        location: 'N/A',
        projects: user.projectsCount,
        verificationStatus: user.verificationStatus,
      })),
    [users],
  );

  const actions = useMemo(
    () => [
      {
        label: 'View',
        icon: (
          <div className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-3 py-1.5 text-sm cursor-pointer transition">
            View
          </div>
        ),
        onClick: (row: any) => router.push(`/user-details/${row.id}`),
      },
    ],
    [router],
  );

 


  return (
    <>
  

      <DataTable
        columns={COLUMNS}
        data={tableData}
        actions={actions}
        showSearch={true}
        searchPlaceholder="Search clients..."
        searchableColumns={['name', 'email', 'phonenumber']}
        rowsPerPageOptions={[5, 8, 10, 20]}
        defaultRowsPerPage={limit}
       isLoading={isLoading}
        serverSide={true}
        totalCount={totalCount}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </>
  );
};

export default Clients;