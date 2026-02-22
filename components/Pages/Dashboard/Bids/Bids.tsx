import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { URLS } from '@/libs/constants/pageurl';
import EOI from './EOI';
import Invitation from './Invitation';
import Submitted from './Submitted';


export default function Bids() {
  const [activeTab, setActiveTab] = useState('eoi');
  

  const tabs = [
    { id: 'eoi', label: 'EOI' },
    { id: 'invitations', label: 'Invitations' },
       { id: 'submittedbids', label: 'Submitted Bids' },
  ];

  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.BID}>
      <div className="p-4">
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
        <div className="mt-6">
          {activeTab === 'eoi' && <EOI/>}
          {activeTab === 'invitations' && <Invitation/>}
            {activeTab === 'submittedbids' && <Submitted />}
        </div>
      </div>
    </DashboardLayout>
  );
}