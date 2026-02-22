import React, { useState } from 'react'
import Activity from './Activity';
import Projects from './Projects';
import Documents from './Documents';
import { UserDetailsProps } from '../UserDetails';

const Otherdetails = ({ id }: UserDetailsProps) => {

     const [activeTab, setActiveTab] = useState('activity');
    
      const tabs = [
        { id: 'activity', label: 'Activity' },
        { id: 'projects', label: 'Projects' },
        { id: 'documents', label: 'Documents' }
      ];
  return (
      <div className="p-6">
      <div className="border-b border-gray-200">
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

      <div className="mt-6">
        {activeTab === 'activity' && (
      <Activity id={id}/>
        )}
        {activeTab === 'projects' && (
         <Projects id={id}/>
        )}
        {activeTab === 'documents' && (
        <Documents id={id}/>
        )}
      </div>
    </div>
  )
}

export default Otherdetails;