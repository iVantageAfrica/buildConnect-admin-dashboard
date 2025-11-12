import Button from '@/components/ui/Button/Button';
import { MeetingCard } from '@/components/ui/Cards/MeetingCards'
import { useRouter } from 'next/navigation';
import React from 'react'

const Meeting = () => {
    const router = useRouter();
    const handleschedulemeeting = () => {
      router.push("/schedule-meetings");
    }
      const upcomingMeetings = [
    {
      id: 1,
      title: 'Site Inspection',
      description: 'Foundation Completeion Review',
      date: 'Dec 15, 2025 at 02:39 PM',
      duration: '2 hours',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Site Inspection',
      description: 'Foundation Completeion Review',
      date: 'Dec 15, 2025 at 02:39 PM',
      duration: '2 hours',
      status: 'Completed'
    }
  ];

  const pastMeetings = [
    {
      id: 3,
      title: 'Site Inspection',
      description: 'Foundation Completeion Review',
      date: 'Dec 15, 2025 at 02:39 PM',
      duration: '2 hours',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Site Inspection',
      description: 'Foundation Completeion Review',
      date: 'Dec 15, 2025 at 02:39 PM',
      duration: '2 hours',
      status: 'Completed'
    }
  ];
  return (
    <div className="max-w-6xl mx-auto">

         <div className="flex justify-end">

           <Button
            onClick={handleschedulemeeting}
            className="bg-blue-300 mb-2 text-white"
          >
            Schedule meetings
          </Button>
        </div>
 
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Meetings
          </h2>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>

  
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Past Meetings
          </h2>
          <div className="space-y-4">
            {pastMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>
  )
}

export default Meeting