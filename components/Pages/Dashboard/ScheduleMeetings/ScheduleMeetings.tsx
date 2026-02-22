"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { URLS } from '@/libs/constants/pageurl';
import BackButton from '@/components/ui/BackButton';
import InputField from '@/components/ui/Forms/InputField';
import Dropdown from '@/components/ui/Forms/Dropdown';
import Textarea from '@/components/ui/Forms/TextArea';
import Button from '@/components/ui/Button/Button';

import { useProjects } from '@/libs/hooks/useProjects';
import { ScheduleMeetingFormData, scheduleMeetingSchema } from '@/libs/schema/projectschema';

interface ScheduleMeetingProps {
  id?: string;
  organizerId?: string;
  clientId?: string;
}

const ScheduleMeetings = ({ id, organizerId }: ScheduleMeetingProps) => {
  const { getMilestoneQuery, createMeetings } = useProjects();
  const {
    data,
    isLoading: isMilestonesLoading,
    error,
    refetch
  } = getMilestoneQuery(id);
console.log(organizerId)
  const milestones = Array.isArray(data?.data?.data)
    ? data?.data?.data.map((milestone: any) => ({
        value: milestone.id,
        label: milestone.name
      }))
    : [];

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<ScheduleMeetingFormData>({
    resolver: zodResolver(scheduleMeetingSchema),
    defaultValues: {
      title: '',
      description: '',
      scheduledAt: '',
      durationMinutes: 60,
      platform: 'zoom',
      meetingType: 'progress_review',
      meetingLink: '',
      meetingId: '',
      passcode: '',
      physicalLocation: '',
      attendeeEmails: '',
      agenda: '',
      milestoneId: ''
    },
    mode: "onChange"
  });

  const platforms = [
    { value: 'zoom', label: 'Zoom' },
    { value: 'google_meet', label: 'Google Meet' },
    { value: 'microsoft_teams', label: 'Microsoft Teams' },
    { value: 'in_person', label: 'In Person' },
  ];

  const meetingTypes = [
    { value: 'project_kickoff', label: 'Project Kickoff' },
    { value: 'milestone_review', label: 'Milestone Review' },
    { value: 'progress_update', label: 'Progress Update' },
    { value: 'issue_resolution', label: 'Issue resolution' },
    { value: 'project_completion', label: 'Project Completion' },
    { value: 'general', label: 'general' },
  ];

  const durationOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' },
    { value: 240, label: '4 hours' },
  ];

  const onSubmit = async (formData: ScheduleMeetingFormData) => {
    const apiData = {
      title: formData.title,
      description: formData.description,
      organizerId: organizerId || '',
      milestoneId: formData.milestoneId,
      scheduledAt: formData.scheduledAt,
      durationMinutes: formData.durationMinutes,
      platform: formData.platform,
      meetingType: formData.meetingType,
      meetingLink: formData.meetingLink || '',
      meetingId: formData.meetingId || '',
      passcode: formData.passcode || '',
      physicalLocation: formData.physicalLocation || '',
      attendeeEmails: formData.attendeeEmails.split(',').map(email => email.trim()),
      agenda: formData.agenda
    };

    createMeetings.mutate({
      projectId: id,
    meetingData: apiData
    });
  }; // Fixed: Added closing brace for onSubmit function

  const handleCancel = () => {
    window.history.back();
  };

  const handleReset = () => {
    reset();
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
                id="title"
                placeholder="e.g., Progress Review Meeting"
                error={errors.title?.message}
                required
                {...register("title")}
              />
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Milestone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Milestone <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="milestoneId"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="milestoneId"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={milestones}
                      error={errors.milestoneId?.message}
                      isLoading={isMilestonesLoading}
                      disabled={isMilestonesLoading}
                      placeholder={isMilestonesLoading ? "Loading milestones..." : "Select a milestone"}
                      required
                    />
                  )}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">Error loading milestones. Please try again.</p>
                )}
              </div>

              {/* Date and Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="scheduledAt"
                  {...register("scheduledAt")}
                  className={`
                    w-full px-4 py-3 rounded-lg border
                    ${errors.scheduledAt
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                  `}
                  required
                />
                {errors.scheduledAt && (
                  <p className="mt-1 text-sm text-red-500">{errors.scheduledAt.message}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="durationMinutes"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="durationMinutes"
                      value={field.value?.toString()}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      options={durationOptions}
                      error={errors.durationMinutes?.message}
                      required
                    />
                  )}
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="platform"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="platform"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={platforms}
                      error={errors.platform?.message}
                      required
                    />
                  )}
                />
              </div>

              {/* Meeting Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Type <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="meetingType"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      width="w-full"
                      label=""
                      id="meetingType"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={meetingTypes}
                      error={errors.meetingType?.message}
                      required
                    />
                  )}
                />
              </div>
            </div>

            {/* Meeting Description */}
            <div className="mb-6">
              <Textarea
                name="description"
                control={control}
                label="Meeting Description"
                placeholder="Brief description of the meeting purpose..."
                maxLength={500}
                showCharCount={true}
                required
                helperText="Provide a brief overview of the meeting"
              />
            </div>

            {/* Conditional Fields based on Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Controller
                name="platform"
                control={control}
                render={({ field: { value: platform } }) => (
                  <>
                    {platform !== 'in_person' && (
                      <>
                        <div>
                          <InputField
                            label="Meeting Link"
                            id="meetingLink"
                            placeholder="https://zoom.us/j/..."
                            error={errors.meetingLink?.message}
                            {...register("meetingLink")}
                          />
                        </div>
                        <div>
                          <InputField
                            label="Meeting ID"
                            id="meetingId"
                            placeholder="123 456 7890"
                            error={errors.meetingId?.message}
                            {...register("meetingId")}
                          />
                        </div>
                        <div>
                          <InputField
                            label="Passcode (Optional)"
                            id="passcode"
                            placeholder="Enter passcode"
                            error={errors.passcode?.message}
                            {...register("passcode")}
                          />
                        </div>
                      </>
                    )}
                    {platform === 'in_person' && (
                      <div className="md:col-span-2">
                        <InputField
                          label="Physical Location"
                          id="physicalLocation"
                          placeholder="e.g., 123 Main St, City, State"
                          error={errors.physicalLocation?.message}
                          {...register("physicalLocation")}
                        />
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            {/* Attendee Emails */}
            <div className="mb-6">
              <InputField
                label="Attendee Emails"
                id="attendeeEmails"
                placeholder="Enter emails separated by commas (e.g., john@example.com, jane@example.com)"
                error={errors.attendeeEmails?.message}
                helperText="Separate multiple emails with commas"
                required
                {...register("attendeeEmails")}
              />
            </div>

            {/* Agenda */}
            <div className="mb-6">
              <Textarea
                name="agenda"
                control={control}
                label="Meeting Agenda"
                placeholder="Detailed agenda items, discussion points..."
                maxLength={1000}
                showCharCount={true}
                required
                rows={4}
                helperText="Outline the meeting topics and discussion points"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={createMeetings.isPending}
                disabled={!isValid || createMeetings.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Schedule Meeting
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleMeetings;