import { SampleImage } from '@/libs/constants/image';
import { ChevronRight } from 'lucide-react';
import React from 'react'

const Media = () => {

  const images = [
    {
      id: 1,
      url: SampleImage,
      alt: 'Foundation work building exterior view 1'
    },
    {
      id: 2,
      url: SampleImage,
      alt: 'Foundation work building exterior view 2'
    },
    {
      id: 3,
      url: SampleImage,
      alt: 'Foundation work building exterior view 3'
    }
  ];
  return (
 <div className="w-full  sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
 
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Foundation Work
          </h2>
          <button 
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            onClick={() => console.log('See all clicked')}
          >
            See all
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-4 border-blue-500"
            >
           
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

        
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Media