import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  value?: string;
  onChange?: (date: string) => void;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label = 'Select date',
  placeholder = 'Select date',
  required = false,
  minDate,
  maxDate,
  className = '',
  value = '',
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Helper functions to replace date-fns
  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const formatDate = (date: Date, formatStr: string): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    if (formatStr === 'MMM dd, yyyy') {
      return `${month} ${day}, ${year}`;
    } else if (formatStr === 'yyyy-MM-dd') {
      const monthNum = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${monthNum}-${day}`;
    }
    return date.toDateString();
  };

  const isBefore = (date1: Date, date2: Date): boolean => {
    return date1.getTime() < date2.getTime();
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const addMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  const subMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
  };

  // Initialize selected date from value
  useEffect(() => {
    if (value) {
      setSelectedDate(parseDate(value));
      setCurrentMonth(parseDate(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const daysArray: (number | null)[] = Array(startingDayOfWeek).fill(null);
    
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }
    
    return daysArray;
  };

  const handleDateSelect = (day: number | null) => {
    if (!day) return;
    
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    // Validate against min/max dates if provided
    if (minDate && isBefore(newDate, minDate)) return;
    if (maxDate && isBefore(maxDate, newDate)) return;
    
    setSelectedDate(newDate);
    onChange?.(formatDate(newDate, 'yyyy-MM-dd'));
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' 
      ? subMonths(currentMonth, 1) 
      : addMonths(currentMonth, 1)
    );
  };

  const isDayDisabled = (day: number | null): boolean => {
    if (!day) return false;
    
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isBefore(maxDate, date)) return true;
    
    return false;
  };

  const isDaySelected = (day: number | null): boolean => {
    if (!day || !selectedDate) return false;
    
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    return isSameDay(date, selectedDate);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      
      <div 
        id={name}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 border rounded-md cursor-pointer flex items-center justify-between ${
          error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
        } focus:ring-2 focus:outline-none`}
      >
        <span className={`${!value ? 'text-gray-400' : ''}`}>
          {value ? formatDate(parseDate(value), 'MMM dd, yyyy') : placeholder}
        </span>
        <Calendar className={`h-5 w-5 ${error ? 'text-red-500' : 'text-gray-400'}`} />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <h3 className="font-medium text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDateSelect(day)}
                disabled={!day || isDayDisabled(day)}
                className={`h-8 w-8 rounded-full text-sm flex items-center justify-center ${
                  !day ? 'invisible' : ''
                } ${
                  isDaySelected(day)
                    ? 'bg-blue-500 text-white'
                    : isDayDisabled(day)
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;