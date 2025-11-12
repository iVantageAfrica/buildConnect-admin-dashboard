import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { URLS } from '@/libs/constants/pageurl';

const MileStoneDetails = () => {
     const paymentItems = [
    { name: 'Labour Costs', amount: '₦15,000,000.00' },
    { name: 'Equipment', amount: '₦15,000,000.00' },
    { name: 'Materials', amount: '₦15,000,000.00' },
    { name: 'Other Expenses', amount: '₦15,000,000.00' },
  ];

  const deliverables = [
    'Foundation work completed',
    'Site inspection passed',
    'Progress photos submitted',
    'Material receipts provided',
  ];
  return (
 <DashboardLayout urlpath={URLS.DASHBOARD.PROJECTS}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Milestone Details
        </h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This is a comprehensive construction project involving multiple phases of development. 
            The project includes site preparation, foundation work, structural construction, and 
            finishing. All work must comply with local building codes and regulations.
          </p>
        </section>

        {/* Deliverables Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Deliverables
          </h2>
          <ul className="space-y-2">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-700 mr-2">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Details
          </h2>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
    
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 grid grid-cols-2 gap-4">
              <div className="text-sm font-medium text-gray-700">Items</div>
              <div className="text-sm font-medium text-gray-700 text-right">Amount</div>
            </div>

        
            <div className="divide-y divide-gray-200">
              {paymentItems.map((item, index) => (
                <div key={index} className="px-6 py-4 grid grid-cols-2 gap-4">
                  <div className="text-gray-900">{item.name}</div>
                  <div className="text-gray-900 text-right font-medium">{item.amount}</div>
                </div>
              ))}

         
              <div className="px-6 py-4 grid grid-cols-2 gap-4 bg-gray-50">
                <div className="text-gray-900 font-semibold">Total</div>
                <div className="text-gray-900 text-right font-semibold">₦15,000,000.00</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
 
  )
}

export default MileStoneDetails