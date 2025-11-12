import React from 'react'

const Overview = () => {
  return (
<div className="">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      
      <p className="text-gray-700 mb-8 leading-relaxed">
        This is a comprehensive construction project involving multiple phases of development. 
        The project includes site preparation, foundation work, structural construction, and finishing. 
        All work must comply with local building codes and regulations.
      </p>

      <div className="grid grid-cols-2 gap-12">
        {/* Project Specifications */}
        <div>
          <h2 className="text-xl font-bold mb-4">Project Specifications</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">Total area: 2,500 sq ft</li>
            <li className="text-gray-700">Number of floors: 2</li>
            <li className="text-gray-700">Bedrooms: 4</li>
            <li className="text-gray-700">Bathrooms: 3</li>
            <li className="text-gray-700">Parking: 2-car garage.</li>
          </ul>
        </div>

        {/* Key Requirements */}
        <div>
          <h2 className="text-xl font-bold mb-4">Key Requirements</h2>
          <ul className="space-y-2">
            <li className="text-gray-700">Energy-efficient design</li>
            <li className="text-gray-700">Modern kitchen and bathrooms</li>
            <li className="text-gray-700">Hardwood flooring</li>
            <li className="text-gray-700">Smart home integration</li>
            <li className="text-gray-700">Landscaping included.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Overview