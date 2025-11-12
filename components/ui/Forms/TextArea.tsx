import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

export default function Textarea<T extends FieldValues>({
  name,
  control,
  label = "Your Message",
  placeholder = "",
  rows = 4,
  disabled = false,
  className = '',
  required = false,
  helperText,
  maxLength = 250,
  showCharCount = true,
}: TextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const charCount = field.value?.length || 0;
        
        return (
          <div className={`w-full ${className}`}>
            {/* Label and Character Count */}
            <div className="flex justify-between items-baseline mb-2">
              {label && (
                <label
                  htmlFor={name}
                  className="text-sm font-medium text-gray-700"
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
              
              {showCharCount && maxLength && (
                <span className={`text-xs ${charCount > maxLength * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                  {charCount}/{maxLength}
                </span>
              )}
            </div>

            {/* Textarea */}
            <textarea
              {...field}
              id={name}
              rows={rows}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              className={`
                w-full px-4 py-3 rounded-lg border
                ${error 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50
                disabled:bg-gray-100 disabled:cursor-not-allowed
                resize-y min-h-[100px] transition-all
                text-gray-900 placeholder:text-gray-400
              `}
            />

            {/* Helper Text */}
            {helperText && !error && (
              <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}

            {/* Error Message */}
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

