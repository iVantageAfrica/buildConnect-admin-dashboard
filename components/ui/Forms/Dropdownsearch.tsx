
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

interface DropdownProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  containerClass?: string;
  labelClass?: string;
  selectClass?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: 'auto' | 'full' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'responsive';
  variant?: 'default' | 'outline' | 'filled';
  error?: string;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Dropdownsearch({
  label,
  id,
  options,
  containerClass = '',
  labelClass = '',
  selectClass = '',
  size = 'md',
  width = 'auto',
  variant = 'default',
  error,
  helperText,
  disabled = false,
  placeholder,
  searchable = false,
  searchPlaceholder = 'Search...',
  noOptionsMessage = 'No options found',
  value = '',
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find selected option
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const sizeClasses = {
    sm: 'pl-3 pr-9 py-2 text-sm',
    md: 'pl-4 pr-10 py-3 text-base',
    lg: 'pl-5 pr-12 py-4 text-lg',
    xl: 'pl-6 pr-14 py-5 text-xl',
  };

  const widthClasses = {
    auto: 'w-auto min-w-[8rem]',
    full: 'w-full',
    xs: 'w-32',
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96',
    xxl: 'w-[24rem]',
    responsive: 'w-full sm:w-64 md:w-80 lg:w-96 xl:w-[28rem]',
  };

  const variantClasses = {
    default: 'bg-white border-gray-300 text-gray-900',
    outline: 'bg-transparent border-gray-400 text-gray-900',
    filled: 'bg-gray-50 border-gray-200 text-gray-900',
  };

  const getButtonClasses = () =>
    [
      'border rounded-lg cursor-pointer w-full text-left flex items-center justify-between',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      'transition-all duration-200 ease-in-out',
      sizeClasses[size],
      variantClasses[variant],
      error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      isFocused && !error && 'ring-2 ring-blue-500 border-blue-500',
      disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : 'hover:border-gray-400',
      selectClass,
    ]
      .filter(Boolean)
      .join(' ');

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  const getLabelClasses = () =>
    [
      'block text-sm font-medium mb-2',
      labelClass,
      error ? 'text-red-700' : disabled ? 'text-gray-500' : 'text-gray-700',
    ].join(' ');

  const getContainerClasses = () =>
    [
      widthClasses[width],
      containerClass,
    ].join(' ');

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
  };

  return (
    <div className={getContainerClasses()} ref={dropdownRef}>
      <label htmlFor={id} className={getLabelClasses()}>
        {label}
      </label>

      <div className="relative">
        <div
          className={getButtonClasses()}
          onClick={(e) => {
            // Check if the click target is the clear button or its child
            const target = e.target as HTMLElement;
            if (target.closest('[data-clear-button]')) {
              return; // Don't open dropdown if clear button was clicked
            }
            if (!disabled) setIsOpen(!isOpen);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!disabled) setIsOpen(!isOpen);
            }
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder || `Select ${label}`}
          </span>
          
          <div className="flex items-center gap-1">
            {selectedOption && (
              <div
                data-clear-button
                onClick={clearSelection}
                className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label="Clear selection"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clearSelection(e as any);
                  }
                }}
              >
                <X className="h-3 w-3 text-gray-400" />
              </div>
            )}
            <ChevronDown 
              className={`${iconSize[size]} text-gray-500 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`} 
              aria-hidden="true" 
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors ${
                      value === option.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-900'
                    }`}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={value === option.value}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  {noOptionsMessage}
                </div>
              )}
            </div>
          </div>
        )}
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