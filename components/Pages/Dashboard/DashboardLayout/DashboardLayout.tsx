
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import Header from './Header/Header';

interface DashboardProps {
  children: ReactNode;
  urlpath: string;
}

const DashboardLayout: React.FC<DashboardProps> = ({ children, urlpath }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePath={urlpath} />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6 pl-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;