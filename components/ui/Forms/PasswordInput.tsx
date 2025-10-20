// components/ui/PasswordInput.tsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  error?: string; 
}

export function PasswordInput({
  label,
  id,
  containerClass = '',
  labelClass = '',
  inputClass = '',
  error,
  ...inputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Dynamic input classes based on error state
  const getInputClasses = () => {
    let baseClasses = `w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${inputClass}`;
    
    if (error) {
      baseClasses += ' border-red-500 focus:ring-red-500';
    } else {
      baseClasses += ' border-gray-300 focus:ring-primary-01';
    }

    return baseClasses;
  };

  return (
    <div className={`${containerClass}`}>
      <label 
        htmlFor={id} 
        className={`block text-sm font-medium mb-2 ${
          error ? 'text-red-700' : 'text-gray-700'
        } ${labelClass}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={getInputClasses()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}