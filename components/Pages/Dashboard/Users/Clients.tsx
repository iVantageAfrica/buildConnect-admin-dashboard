import Button from '@/components/ui/Button/Button';
import { DataTable } from '@/components/ui/Datatable'
import { useRouter } from 'next/navigation';
import React from 'react'

const Clients = () => {
const router = useRouter();
    const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phonenumber: '0813167675', location:'Ikoyi, Lagos', projects:'1' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phonenumber: '081326756', location:'Ikoyi, Lagos', projects:'2' },
  ];
  const handleClick = (row: any) => {
     const id = row.activity ?? 1;
    router.push(`/user-details/${id}`);
  };
const actions = [
    {
      label: 'View',
      icon:   <Button className='bg-blue-300 mb-2 p-1.5 text-white'>View</Button>,
      onClick: (row :any) => handleClick(row)
    },
  
  ];
  const columns = [
    { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email Address' },
    { key: 'phonenumber', header: 'Phone Number' },
       { key: 'location', header: 'Location' },
    { key: 'projects', header: 'Projects' },
  ];

  return (
    <>
    <div className="flex justify-end">
  
    </div>
    <DataTable 
  columns={columns}
  data={data}
actions={actions}
  showSearch={true}
  searchPlaceholder="Search..."
  searchableColumns={['name', 'email']}
/></>

  )
}

export default Clients;