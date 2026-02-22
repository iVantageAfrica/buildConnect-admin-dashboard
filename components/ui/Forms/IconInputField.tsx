// components/ui/Forms/IconInputField.tsx
import { InputHTMLAttributes, ReactNode } from 'react';

interface IconInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  id: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  inputSize?: 'sm' | 'md' | 'lg' | 'xl';
  error?: any;
  helperText?: string;
  icon: ReactNode;
  iconPosition?: 'left' | 'right';
  currency?: boolean;
}

export function IconInputField({
  label,
  id,
  containerClass = '',
  labelClass = '',
  inputClass = '',
  inputSize = 'md',
  error,
  helperText,
  icon,
  iconPosition = 'left',
  currency = false,
  ...inputProps
}: IconInputFieldProps) {
  
  const sizeClasses = {
    sm: 'px-8 py-1.5 text-xs min-h-[2rem]',
    md: 'px-10 py-3 text-sm min-h-[2.75rem]',
    lg: 'px-12 py-4 text-base min-h-[3.25rem]',
    xl: 'px-14 py-5 text-lg min-h-[3.75rem]',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  const iconPositionClasses = {
    left: 'left-3',
    right: 'right-3',
  };

  const getLabelClasses = () => {
    let classes = `block text-sm font-medium mb-2 ${labelClass}`;
    
    if (error) {
      classes += ' text-red-700';
    } else if (inputProps.disabled) {
      classes += ' text-gray-500';
    } else {
      classes += ' text-gray-700';
    }

    return classes;
  };

  const getInputClasses = () => {
    let classes = `
      w-full border rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-all duration-200 ease-in-out
      ${sizeClasses[inputSize]}
      ${iconPosition === 'left' ? 'pl-10' : 'pr-10'}
      ${currency && iconPosition === 'left' ? 'pl-8' : ''}
      ${inputClass}
    `;

    if (error) {
      classes += ' border-red-500 focus:ring-red-500';
    } else {
      classes += ' border-gray-300';
    }

    if (inputProps.disabled) {
      classes += ' opacity-60 cursor-not-allowed bg-gray-100';
    } else {
      classes += ' hover:border-gray-400';
    }

    return classes;
  };

  const getIconClasses = () => [
    'absolute top-1/2 -translate-y-1/2',
    iconPositionClasses[iconPosition],
    iconSizeClasses[inputSize],
    error ? 'text-red-500' : inputProps.disabled ? 'text-gray-400' : 'text-gray-400',
  ].join(' ');

  return (
    <div className={`w-full ${containerClass}`}>
      <label htmlFor={id} className={getLabelClasses()}>
        {label}
      </label>
      
      <div className="relative">
        {currency && iconPosition === 'left' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium">₦</span>
        )}
        
        {icon && (
          <div className={getIconClasses()}>
            {icon}
          </div>
        )}
        
        <input
          id={id}
          className={getInputClasses()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...inputProps}
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

export default IconInputField;