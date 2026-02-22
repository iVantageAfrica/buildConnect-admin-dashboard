// components/ui/Forms/IconDropdown.tsx
import { SelectHTMLAttributes, useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface IconDropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  containerClass?: string;
  labelClass?: string;
  selectClass?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  error?: string;
  helperText?: string;
  icon: ReactNode;
}

export function IconDropdown({
  label,
  id,
  options,
  containerClass = '',
  labelClass = '',
  selectClass = '',
  size = 'md',
  error,
  helperText,
  icon,
  ...selectProps
}: IconDropdownProps) {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'pl-8 pr-8 py-2 text-sm',
    md: 'pl-10 pr-10 py-3 text-base',
    lg: 'pl-12 pr-12 py-4 text-lg',
    xl: 'pl-14 pr-14 py-5 text-xl',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  const getSelectClasses = () =>
    [
      'border rounded-lg appearance-none cursor-pointer w-full',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'transition-all duration-200 ease-in-out',
      sizeClasses[size],
      error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
      isFocused && !error && 'ring-2 ring-blue-500 border-blue-500',
      selectProps.disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : 'hover:border-gray-400',
      selectClass,
    ]
      .filter(Boolean)
      .join(' ');

  const getLabelClasses = () =>
    [
      'block text-sm font-medium mb-2',
      labelClass,
      error ? 'text-red-700' : selectProps.disabled ? 'text-gray-500' : 'text-gray-700',
    ].join(' ');

  return (
    <div className={`w-full ${containerClass}`}>
      <label htmlFor={id} className={getLabelClasses()}>
        {label}
      </label>

      <div className="relative">
        {/* Left Icon */}
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconSizeClasses[size]} ${
          error ? 'text-red-500' : selectProps.disabled ? 'text-gray-400' : 'text-gray-400'
        }`}>
          {icon}
        </div>

        <select
          id={id}
          className={getSelectClasses()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...selectProps}
        >
          <option value="">{selectProps.placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconSizeClasses[size]} ${
          error ? 'text-red-500' : selectProps.disabled ? 'text-gray-400' : 'text-gray-400'
        } pointer-events-none`} />
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

export default IconDropdown;