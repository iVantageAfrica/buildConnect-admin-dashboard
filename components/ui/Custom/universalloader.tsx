import React from 'react';


interface UniversalLoaderProps {
  text?: string;
  reason?: string;
}

const UniversalLoader: React.FC<UniversalLoaderProps> = ({ text, reason }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-gray-50 ">
      <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md p-6 border border-gray-200">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-800">
            {text || "Loading..."}
          </h1>
                   
          {/* Enhanced gradient spinner with teal colors */}
          <div className="mt-4 flex justify-center">
            <div className="relative h-12 w-12">
              {/* Outer gradient ring */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{
                  backgroundImage: 'conic-gradient(transparent, #14b8a6, #0d9488, transparent)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  animation: 'spin 1.5s linear infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor'
                }}
              ></div>
                           
              {/* Inner gradient dot */}
              <div 
                className="absolute top-1 left-1/2 h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transform -translate-x-1/2"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              ></div>
            </div>
          </div>
                   
          {/* Optional status text */}
          <p className="text-sm text-gray-600 mt-4">
            {reason || "Processing your request. This will only take a moment."}
          </p>
        </div>
                 
        {/* Animation styles */}
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; transform: translateX(-50%) scale(1.2); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default UniversalLoader;