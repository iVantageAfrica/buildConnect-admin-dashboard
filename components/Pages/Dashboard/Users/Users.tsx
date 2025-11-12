import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import Clients from './Clients';
import { URLS } from '@/libs/constants/pageurl';
import Builders from './Builders';
import Addclient from './Addclient/Addclient';
import Button from '@/components/ui/Button/Button';


export default function Users() {
  const [activeTab, setActiveTab] = useState('clients');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: 'clients', label: 'Clients' },
    { id: 'builders', label: 'Builders' }
  ];

  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.USERS}>
      <div className="p-4">
        <div>
          <p className="text-2xl font-bold ">User Management</p>
             <p className="text-sm py-4">Manage Builders and client on the platform</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="border-b border-gray-200 flex-1">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    pb-4 px-1 text-sm font-medium transition-colors relative
                    ${activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </nav>
          </div>
          
         
         
        </div>
        <div className="flex justify-end">
           <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-300 mb-2 text-white"
          >
            Add Client
          </Button>
        </div>

        <div className="mt-6">
          {activeTab === 'clients' && <Clients />}
          {activeTab === 'builders' && <Builders />}
        </div>
      </div>

      <Addclient 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </DashboardLayout>
  );
}