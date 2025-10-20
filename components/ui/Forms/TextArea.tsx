import React, { useState, useEffect } from 'react';

type TextAreaProps = {
  label?: string;
  maxLength?: number;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  label = "Your Message",
  maxLength = 250,
  placeholder = "",
  value = "",
  onChange,
  className = "",
  ...props
}: TextAreaProps) {
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between items-baseline mb-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs text-gray-500">
          {charCount}/{maxLength}
        </span>
      </div>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y min-h-[100px]"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
