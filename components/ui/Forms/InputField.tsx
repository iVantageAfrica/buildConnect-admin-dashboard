import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  id: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  inputSize?: 'sm' | 'md' | 'lg' | 'xl'; // Renamed from 'size' to 'inputSize'
  error?: any;
  helperText?: string;
}

export function InputField({
  label,
  id,
  containerClass = '',
  labelClass = '',
  inputClass = '',
  inputSize = 'md', // Updated prop name
  error,
  helperText,
  ...inputProps
}: InputFieldProps) {
  
  // Responsive size classes for different breakpoints
  const sizeClasses = {
    sm: 'px-2 py-1.5 text-xs min-h-[2rem] sm:px-3 sm:py-2 sm:text-sm sm:min-h-[2.25rem]',
    md: 'px-3 py-2 text-sm min-h-[2.25rem] sm:px-4 sm:py-3 sm:text-base sm:min-h-[2.75rem]',
    lg: 'px-4 py-3 text-base min-h-[2.75rem] sm:px-5 sm:py-4 sm:text-lg sm:min-h-[3.25rem]',
    xl: 'px-5 py-4 text-lg min-h-[3.25rem] sm:px-6 sm:py-5 sm:text-xl sm:min-h-[3.75rem]',
  };

  // Get responsive label classes
  const getLabelClasses = () => {
    let classes = `block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${labelClass}`;
    
    if (error) {
      classes += ' text-red-700';
    } else if (inputProps.disabled) {
      classes += ' text-gray-500';
    } else {
      classes += ' text-gray-700';
    }

    return classes;
  };

  // Get responsive input classes
  const getInputClasses = () => {
    let classes = `
      w-full border rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-primary-01 focus:border-transparent
      transition-all duration-200 ease-in-out
      ${sizeClasses[inputSize]} // Updated to use inputSize
      ${inputClass}
    `;

    if (error) {
      classes += ' border-red-500 focus:ring-red-500 focus:border-red-500';
    } else {
      classes += ' border-gray-300';
    }

    if (inputProps.disabled) {
      classes += ' opacity-60 cursor-not-allowed bg-gray-100';
    } else {
      classes += ' bg-white hover:border-gray-400';
    }

    return classes;
  };

  return (
    <div className={`w-full ${containerClass}`}>
      <label
        htmlFor={id}
        className={getLabelClasses()}
      >
        {label}
      </label>
      
      <input
        id={id}
        className={getInputClasses()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...inputProps}
      />

      {/* Error message - responsive text size */}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Helper text - responsive text size */}
      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1 text-xs sm:text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default InputField;