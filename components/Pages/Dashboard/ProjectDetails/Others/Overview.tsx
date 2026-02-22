import React from 'react'

const Overview = ({project}:any) => {
  
  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      
      <p className="text-gray-700 mb-8 leading-relaxed">
       {project?.description}
      </p>

      <div className="grid grid-cols-2 gap-12">
        {/* Project Specifications */}
        <div>
          <h2 className="text-xl font-bold mb-4">Location</h2>
          <ul className="space-y-2">
            <li className="text-gray-700"> {project?.location}</li>    
          </ul>
        </div>

        {/* Key Requirements */}
        <div>
          <h2 className="text-xl font-bold mb-4">Timeline</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">
              Start Date: {formatDate(project?.startDate)} 
            </li>
            <li className="text-gray-700">
              End Date: {formatDate(project?.endDate)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Overview