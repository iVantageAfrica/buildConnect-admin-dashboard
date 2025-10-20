import React, { useState, useEffect } from 'react';
import { Check, Download } from 'lucide-react';

interface TransactionSuccessProps {
  onDownload?: () => void;
  title?: string;
  showAnimation?: boolean;
  onAnimationComplete?: () => void;
}

const TransactionSuccessfulModal: React.FC<TransactionSuccessProps> = ({ 
  onDownload = () => console.log('Download receipt clicked'),
  title = "Transaction successful",
  showAnimation = true,
  onAnimationComplete = () => {}
}) => {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (showAnimation) {
     
      const checkTimer = setTimeout(() => {
        setShowCheck(true);
      }, 100);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
        onAnimationComplete();
      }, 600);

      return () => {
        clearTimeout(checkTimer);
        clearTimeout(contentTimer);
      };
    } else {
    
      setShowCheck(true);
      setShowContent(true);
    }
  }, [showAnimation, onAnimationComplete]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="  p-8 w-full max-w-md mx-auto">
    
        <div className="flex justify-center mb-6">
          <div 
            className={`
              relative w-20 h-20 rounded-full bg-primary-01 flex items-center justify-center
              transform transition-all duration-500 ease-out
              ${showCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}
          >
        
            <div 
              className={`
                absolute inset-0 rounded-full bg-primary 
                animate-ping transition-opacity duration-1000
                ${showCheck ? 'opacity-30' : 'opacity-0'}
              `}
            />
            
     
            <Check 
              className={`
                w-10 h-10 text-white relative z-10
                transform transition-all duration-300 ease-out delay-200
                ${showCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
              strokeWidth={3}
            />
          </div>
        </div>

  
        <div 
          className={`
            text-center mb-8 transform transition-all duration-500 ease-out
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <h1 className="text-xl font-semibold text-gray-800">
            {title}
          </h1>
        </div>

     
        <div 
          className={`
            flex justify-center transform transition-all duration-500 ease-out delay-100
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <button
            onClick={onDownload}
            className="
              bg-primary-01 hover:bg-primary-02 text-white px-6 py-3 rounded-lg
              flex items-center gap-2 font-medium transition-all duration-200
              transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            "
          >
            <Download className="w-5 h-5" />
            Download transaction receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccessfulModal;