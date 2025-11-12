import { Star } from "lucide-react";

export default function Overview() {
  const builderData = {
    companyName: "ABC Construction",
    phoneNumber: "+234 907 155 9651",
    address: "Smi_12@gmail.com",
    specialty: "Residentials",
    yearsOfExperience: "10 years",
    onTimeCompletionRate: "20%",
    rating: 4.5,
    projectsAwarded: 12,
    totalProjectsBidded: 10,
    kycStatus: "Pending",
    licenses: "COREN, CAC Registration",
    verifiedProjectsCount: 18
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className=" rounded-lg border border-gray-300  p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Profile</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium w-48">Company Name</span>
                <span className="text-gray-900 font-medium">{builderData.companyName}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium w-48">Phone Number:</span>
                <span className="text-gray-900">{builderData.phoneNumber}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium w-48">Address:</span>
                <span className="text-gray-900">{builderData.address}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium w-48">Specialty:</span>
                <span className="text-gray-900">{builderData.specialty}</span>
              </div>
              
              <div className="flex py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium w-48">Years of Experience:</span>
                <span className="text-gray-900">{builderData.yearsOfExperience}</span>
              </div>
            </div>
          </div>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
          <div className="rounded-lg  border border-gray-300 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Stats</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">On-time Completion Rate (%):</span>
                <span className="text-gray-900 font-semibold">{builderData.onTimeCompletionRate}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Rating:</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-900 font-semibold">{builderData.rating} rating</span>
                </div>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Projects Awarded:</span>
                <span className="text-gray-900 font-semibold">{builderData.projectsAwarded} Awarded</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Total Projects Bidded:</span>
                <span className="text-gray-900 font-semibold">{builderData.totalProjectsBidded} Bid</span>
              </div>
            </div>
          </div>

   
          <div className="border border-gray-300 rounded-lg  p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Verification</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">KYC Status:</span>
                <span className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-700">
                  {builderData.kycStatus}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Licenses:</span>
                <span className="text-gray-900 font-medium">{builderData.licenses}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Verified Projects Count:</span>
                <span className="text-gray-900 font-semibold">{builderData.verifiedProjectsCount} Verified Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}