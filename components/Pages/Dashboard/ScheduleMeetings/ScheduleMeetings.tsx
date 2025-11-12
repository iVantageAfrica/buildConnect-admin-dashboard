"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { URLS } from '@/libs/constants/pageurl';
import BackButton from '@/components/ui/BackButton';
import InputField from '@/components/ui/Forms/InputField';
import Dropdown from '@/components/ui/Forms/Dropdown';
import Textarea from '@/components/ui/Forms/TextArea';

// Zod Schema
const scheduleMeetingSchema = z.object({
  meetingTitle: z.string()
    .min(3, 'Meeting title must be at least 3 characters')
    .max(100, 'Meeting title is too long'),
  
  project: z.string()
    .min(1, 'Please select a project'),
  
  milestone: z.string()
    .min(1, 'Please select a milestone'),
  
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a priority level' })
  }),
  
  attendees: z.string()
    .min(1, 'Please select attendees'),
  
  date: z.string()
    .min(1, 'Please select a date')
    .refine((date) => new Date(date) >= new Date(), {
      message: 'Date must be in the future'
    }),
  
  time: z.string()
    .min(1, 'Please select a time'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(250, 'Message must not exceed 250 characters')
});

type ScheduleMeetingFormData = z.infer<typeof scheduleMeetingSchema>;

const ScheduleMeetings = () => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ScheduleMeetingFormData>({
    resolver: zodResolver(scheduleMeetingSchema),
    defaultValues: {
      meetingTitle: '',
      project: '',
      milestone: '',
      priority: undefined,
      attendees: '',
      date: '',
      time: '',
      message: ''
    }
  });

  // Options data
  const projects = [
    { value: "premium-package", label: "Premium Package" },
    { value: "starplus-package", label: "Starplus Package" },
    { value: "basic-package", label: "Basic Package" },
  ];

  const milestones = [
    { value: "foundation-work", label: "Foundation Work" },
    { value: "structural-work", label: "Structural Work" },
    { value: "finishing-work", label: "Finishing Work" },
  ];

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const attendees = [
    { value: "project-manager", label: "Project Manager" },
    { value: "contractor", label: "Contractor" },
    { value: "client", label: "Client" },
    { value: "engineer", label: "Engineer" },
  ];

  // Generate time slots
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const onSubmit = async (data: ScheduleMeetingFormData) => {
    try {
      console.log('Form Data:', data);
      
      // TODO: Replace with your API call
      // const response = await fetch('/api/meetings', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });
      
      alert('Meeting scheduled successfully!');
      
      // Reset form or redirect
      // router.push('/dashboard/meetings');
      
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting. Please try again.');
    }
  };

  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.MEETING}>
      <BackButton label="Back" />
      
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Meeting</h1>
        <p className="text-md text-gray-600 mt-2 mb-6">
          Create a new meeting or site visit
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            
            {/* Meeting Title */}
            <div className="mb-6">
              <InputField
                label="Meeting Title"
                id="meetingTitle"
                placeholder="e.g., Site visit"
                error={errors.meetingTitle?.message}
                {...register("meetingTitle")}
              />
            </div>

            {/* Grid Layout for Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Project */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="project"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="project"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={projects}
                      error={errors.project?.message}
                    />
                  )}
                />
              </div>

              {/* Milestone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Milestone <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="milestone"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="milestone"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={milestones}
                      error={errors.milestone?.message}
                    />
                  )}
                />
              </div>

    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="priority"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={priorities}
                      error={errors.priority?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attendees <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="attendees"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="attendees"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={attendees}
                      error={errors.attendees?.message}
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date")}
                  className={`
                    w-full px-4 py-3 rounded-lg border
                    ${errors.date 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                  `}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="time"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={timeSlots}
                      error={errors.time?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="mb-6">
              <Textarea
                name="message"
                control={control}
                label="Meeting Description"
                placeholder="Enter meeting agenda and details..."
                maxLength={250}
                showCharCount={true}
                required
                helperText="Provide details about the meeting purpose and agenda"
              />
            </div>
            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleMeetings;