import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

// Mock ToastType for demo
interface ToastType {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  size?: 'compact' | 'default' | 'large';
}

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

interface VariantConfig {
  bgColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  descColor: string;
  progressColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SizeConfig {
  container: string;
  padding: string;
  gap: string;
  iconWrapper: string;
  iconSize: string;
  titleText: string;
  descText: string;
  closeButton: string;
  closeIcon: string;
  progressHeight: string;
  maxWidth: string;
}

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    const duration = toast.duration || 5000;
    const hideTimer = setTimeout(() => {
      handleRemove();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [toast.duration]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onRemove(toast.id);
    }, 300);
  };

  const variants: Record<string, VariantConfig> = {
    default: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      titleColor: 'text-gray-900',
      descColor: 'text-gray-600',
      progressColor: 'bg-blue-500',
      icon: Info
    },
    success: {
      bgColor: 'bg-white',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      titleColor: 'text-emerald-900',
      descColor: 'text-emerald-700',
      progressColor: 'bg-emerald-500',
      icon: CheckCircle
    },
    error: {
      bgColor: 'bg-white',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      descColor: 'text-red-700',
      progressColor: 'bg-red-500',
      icon: XCircle
    },
    warning: {
      bgColor: 'bg-white',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-900',
      descColor: 'text-amber-700',
      progressColor: 'bg-amber-500',
      icon: AlertTriangle
    },
    info: {
      bgColor: 'bg-white',
      borderColor: 'border-sky-200',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      titleColor: 'text-sky-900',
      descColor: 'text-sky-700',
      progressColor: 'bg-sky-500',
      icon: Info
    }
  };

  const sizes: Record<string, SizeConfig> = {
    compact: {
      container: 'min-h-12',
      padding: 'p-2.5',
      gap: 'gap-2',
      iconWrapper: 'p-1',
      iconSize: 'w-3 h-3',
      titleText: 'text-xs font-medium',
      descText: 'text-xs',
      closeButton: 'p-0.5',
      closeIcon: 'w-3 h-3',
      progressHeight: 'h-0.5',
      maxWidth: 'max-w-xs'
    },
    default: {
      container: 'min-h-16',
      padding: 'p-3.5',
      gap: 'gap-3',
      iconWrapper: 'p-1.5',
      iconSize: 'w-4 h-4',
      titleText: 'text-sm font-medium',
      descText: 'text-sm',
      closeButton: 'p-1',
      closeIcon: 'w-4 h-4',
      progressHeight: 'h-1',
      maxWidth: 'max-w-sm'
    },
    large: {
      container: 'min-h-20',
      padding: 'p-4',
      gap: 'gap-3.5',
      iconWrapper: 'p-2',
      iconSize: 'w-5 h-5',
      titleText: 'text-base font-semibold',
      descText: 'text-sm',
      closeButton: 'p-1',
      closeIcon: 'w-4 h-4',
      progressHeight: 'h-1',
      maxWidth: 'max-w-md'
    }
  };

  const variant = variants[toast.variant || 'default'] || variants.default;
  const size = sizes[toast.size || 'default'] || sizes.default;
  const IconComponent = variant.icon;

  if (!shouldRender) return null;

  return (
    <div
      className={`transform transition-all duration-300 ease-out mb-3 w-full px-4 sm:px-0 ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div
        className={`
          w-full ${size.maxWidth} ${variant.bgColor} 
          shadow-lg shadow-black/5 rounded-xl border ${variant.borderColor} 
          pointer-events-auto overflow-hidden mx-auto sm:mx-0 
          ${size.container} backdrop-blur-sm
          hover:shadow-xl hover:shadow-black/10 transition-shadow duration-200
        `}
      >
        <div className={size.padding}>
          <div className={`flex items-start ${size.gap}`}>
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <div className={`${size.iconWrapper} rounded-lg ${variant.iconBg} ring-1 ring-black/5`}>
                <IconComponent className={`${size.iconSize} ${variant.iconColor}`} />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`${size.titleText} ${variant.titleColor} leading-tight tracking-tight`}>
                {toast.title}
              </p>
              {toast.description && (
                <p className={`mt-1 ${size.descText} ${variant.descColor} leading-relaxed break-words hyphens-auto`}>
                  {toast.description}
                </p>
              )}
            </div>
            
            {/* Close button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleRemove}
                className={`
                  ${size.closeButton} rounded-lg inline-flex text-gray-400 
                  hover:text-gray-600 hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 
                  transition-all duration-150 ease-in-out
                `}
                aria-label="Close toast"
              >
                <X className={size.closeIcon} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className={`${size.progressHeight} bg-gray-50 relative overflow-hidden`}>
          <div 
            className={`
              h-full transition-all ease-linear ${variant.progressColor}
              relative before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:animate-pulse
            `}
            style={{
              animation: `shrink ${toast.duration || 5000}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
};
