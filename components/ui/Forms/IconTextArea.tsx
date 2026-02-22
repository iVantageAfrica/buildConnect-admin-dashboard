// components/ui/Forms/IconTextarea.tsx
import { TextareaHTMLAttributes, ReactNode } from 'react';

interface IconTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  id: string;
  containerClass?: string;
  labelClass?: string;
  textareaClass?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  error?: any;
  helperText?: string;
  icon?: ReactNode;
}

export function IconTextarea({
  label,
  id,
  containerClass = '',
  labelClass = '',
  textareaClass = '',
  size = 'md',
  error,
  helperText,
  icon,
  ...textareaProps
}: IconTextareaProps) {
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[80px]',
    md: 'px-4 py-3 text-base min-h-[120px]',
    lg: 'px-5 py-4 text-lg min-h-[160px]',
    xl: 'px-6 py-5 text-xl min-h-[200px]',
  };

  const getLabelClasses = () => {
    let classes = `block text-sm font-medium mb-2 ${labelClass}`;
    
    if (error) {
      classes += ' text-red-700';
    } else if (textareaProps.disabled) {
      classes += ' text-gray-500';
    } else {
      classes += ' text-gray-700';
    }

    return classes;
  };

  const getTextareaClasses = () => {
    let classes = `
      w-full border rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-all duration-200 ease-in-out resize-none
      ${sizeClasses[size]}
      ${textareaClass}
    `;

    if (error) {
      classes += ' border-red-500 focus:ring-red-500';
    } else {
      classes += ' border-gray-300';
    }

    if (textareaProps.disabled) {
      classes += ' opacity-60 cursor-not-allowed bg-gray-100';
    } else {
      classes += ' hover:border-gray-400';
    }

    return classes;
  };

  return (
    <div className={`w-full ${containerClass}`}>
      <label htmlFor={id} className={getLabelClasses()}>
        {label}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">
            {icon}
          </div>
        )}
        
        <textarea
          id={id}
          className={getTextareaClasses()}
          style={{ paddingLeft: icon ? '2.5rem' : undefined }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...textareaProps}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default IconTextarea;