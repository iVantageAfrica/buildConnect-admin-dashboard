
import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { AvatarImage } from '@/libs/constants/image';
import Image from 'next/image';

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <Image
          src={AvatarImage}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute w-[480px] right-0 mt-6 w-96 bg-white rounded-2xl border border-gray-200 z-20 p-6">
       
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full  overflow-hidden mb-3 border-4 border-blue-500">
                <Image
                  src={AvatarImage}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Hi, Lorem Ipsum!</h3>
              </div>
            </div>

      
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-xl py-3 px-4 transition-colors">
                <User size={20} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Manage Account</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-xl py-3 px-4 transition-colors">
                <LogOut size={20} className="text-gray-700" />
                <span className="text-gray-700 font-medium">Log Out</span>
              </button>
            </div>

            <div className="space-y-3 text-center text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a href="#" className="hover:text-gray-800">Company</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">About</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Contact</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Help</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Safety</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Privacy Center</a>
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a href="#" className="hover:text-gray-800">Terms & Policies</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Community Guidelines</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Terms Of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-800">Legal disclaimer</a>
              </div>
              <div className="pt-3 text-gray-500">
                © 2025 BUILDCONNECT
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}