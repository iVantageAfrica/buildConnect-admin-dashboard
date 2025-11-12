import SearchBar from '@/components/ui/Forms/Search'
import UserProfileDropdown from '@/components/ui/UserProfile'
import { Bell } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
  <div className="bg-white border-b border-gray-200 p-3">
           <div className="flex items-center justify-between">
             <div className="">
              <SearchBar/>
             </div>
             <div className="flex items-center space-x-4">
               <div className="relative">
                 <Bell size={24} className="text-gray-600" />
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                   <span className="text-xs text-white font-bold">4</span>
                 </div>
               </div>
               <UserProfileDropdown />
             </div>
           </div>
         </div>
  )
}

export default Header