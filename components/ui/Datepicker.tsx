import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function CalendarHeader() {
  const [view, setView] = useState('Day View');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const views = ['Day View', 'Week View', 'Month View', 'Year View'];

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'Day View') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (view === 'Week View') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (view === 'Month View') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (view === 'Year View') {
      newDate.setFullYear(currentDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'Day View') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (view === 'Week View') {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (view === 'Month View') {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else if (view === 'Year View') {
      newDate.setFullYear(currentDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDisplayText = () => {
    if (view === 'Day View') {
      return formatDate(currentDate);
    } else if (view === 'Week View') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (view === 'Month View') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (view === 'Year View') {
      return currentDate.getFullYear().toString();
    }
  };

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between">
        {/* Left Section - Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <button
            onClick={handleToday}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Today
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

        </div>

        {/* Right Section - View Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700 font-medium">{view}</span>
            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {views.map((viewOption) => (
                  <button
                    key={viewOption}
                    onClick={() => {
                      setView(viewOption);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      view === viewOption ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {viewOption}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}