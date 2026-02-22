import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/modals/Modal';
import React, { useState } from 'react';
import Photo from './Photo';
import Address from './Address';
import Details from './Details';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/libs/hooks/usetoast';
import { ClientFormData, clientSchema } from '@/libs/schema/userschema';
import { useUsers } from '@/libs/hooks/useUsers';

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  role:string
  onSuccess?: () => void;
}

const AddBuilders = ({ isOpen, onClose, title = "Add Builders", onSuccess }: AddClientProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const { toast } = useToast();
  const { createClientMutation } = useUsers();

  const methods = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      verificationStatus: "pending",
      isEmailVerified: false,
    },
    mode: "onChange"
  });

  const { handleSubmit, formState: { isValid }, trigger } = methods;

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'address', label: 'Address' },
    { id: 'photo', label: 'Photo' }
  ];

  const handleTabChange = async (tabId: string) => {
    if (tabId === 'address') {
      const isDetailsValid = await trigger(['firstName', 'lastName', 'email', 'phoneNumber']);
      if (!isDetailsValid) return;
    } else if (tabId === 'photo') {
      const isAddressValid = await trigger(['location']);
      if (!isAddressValid) return;
    }
    setActiveTab(tabId);
  };

  const onSubmit = (data: FormData) => {
    createClientMutation.mutate(data);
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  const isFormValid = isValid && !createClientMutation.isPending;

  return (
    <FormProvider {...methods}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="lg"
        footer={
          <>
            <Button
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              loading={createClientMutation.isPending}
              disabled={!isFormValid}
            >
              Save Client
            </Button>
          </>
        }
      >
        <div className="p-4">
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${activeTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : index < tabs.findIndex(t => t.id === activeTab)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {index + 1}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">{tab.label}</span>
                  </div>
                  {index < tabs.length - 1 && (
                    <div className={`
                      flex-1 h-1 mx-2
                      ${index < tabs.findIndex(t => t.id === activeTab) 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                      }
                    `} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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

          {/* Form Content */}
          <div className="my-4">
            {activeTab === 'details' && <Details />}
            {activeTab === 'address' && <Address />}
            {activeTab === 'photo' && <Photo />}
          </div>

          {/* Form Progress */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Step {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}
              </span>
              <span className={isFormValid ? 'text-green-600' : 'text-yellow-600'}>
                {isFormValid ? 'Ready to save' : 'Complete all required fields'}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default AddBuilders;