import { Calendar, Clock } from "lucide-react";

export  const MeetingCard = ({ meeting }) => (
    <div className="bg-white border border-gray-200 rounded-lg px-6 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {meeting.title}
          </h3>
          <p className="text-gray-600 mb-2">
            {meeting.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{meeting.date}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 ml-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            {meeting.status}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock size={16} />
            <span>{meeting.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );