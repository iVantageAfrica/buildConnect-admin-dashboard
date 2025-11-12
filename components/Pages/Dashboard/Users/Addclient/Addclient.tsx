import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/modals/Modal';
import React, { useState } from 'react';
import Photo from './Photo';
import Address from './Address';
import Details from './Details';

const Addclient = ({ isOpen, onClose }) => {

 const [activeTab, setActiveTab] = useState('details');
    
      const tabs = [
        { id: 'details', label: 'Details' },
        { id: 'address', label: 'Address' },
        { id: 'photo', label: 'Photo' }
      ];
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Client"
      footer={
        <>
          <Button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Save
          </Button>
        </>
      }
    >

         <div className="p-4">
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
        {activeTab === 'details' && (
    <Details/>
        )}
        {activeTab === 'address' && (
      <Address/>
        )}
        {activeTab === 'photo' && (
       <Photo/>
        )}
      </div>
    </div> 
    </Modal>
  );
};

export default Addclient;