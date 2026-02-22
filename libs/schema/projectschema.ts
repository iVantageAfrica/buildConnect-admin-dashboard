
import { z } from 'zod';
export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  budget: z.string().min(1, "Budget is required"),
  client: z.string().min(1, "Please select a client"),
  builder: z.string().min(1, "Please select a builder"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
});

export const milestoneSchema = z.object({
  name: z.string()
    .min(1, 'Milestone name is required')
    .min(3, 'Milestone name must be at least 3 characters')
    .max(100, 'Milestone name must not exceed 100 characters'),
  
  description: z.string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  
  completionDate: z.string()
    .min(1, 'Completion date is required')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Completion date must be today or in the future'),
  
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be a positive number'
    })
});

export const documentSchema = z.object({
  fileId: z.string().uuid("Invalid file ID format"),
  type: z.string().min(1, "Document type is required"),
  description: z.string().min(1, "Description is required")
});




export const documentUploadSchema = z.object({
  documents: z.array(documentSchema).min(1, "At least one document is required")
});

export const scheduleMeetingSchema = z.object({
  title: z.string()
    .min(3, 'Meeting title must be at least 3 characters')
    .max(100, 'Meeting title is too long'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  
  scheduledAt: z.string()
    .min(1, 'Please select date and time'),
  
  durationMinutes: z.number()
    .min(15, 'Duration must be at least 15 minutes')
    .max(480, 'Duration cannot exceed 8 hours'),
  
  platform: z.enum(['zoom', 'google_meet', 'microsoft_teams', 'in_person'], {
    errorMap: () => ({ message: 'Please select a platform' })
  }),
  
  meetingType: z.enum(['project_kickoff', 'progress_review', 'design_review', 'site_visit', 'client_meeting', 'team_meeting'], {
    errorMap: () => ({ message: 'Please select meeting type' })
  }),
  
  meetingLink: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  meetingId: z.string()
    .optional()
    .or(z.literal('')),
  
  passcode: z.string()
    .optional()
    .or(z.literal('')),
  
  physicalLocation: z.string()
    .optional()
    .or(z.literal('')),
  
  attendeeEmails: z.string()
    .min(1, 'Please enter at least one email')
    .refine((emails) => {
      const emailList = emails.split(',').map(email => email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailList.every(email => emailRegex.test(email));
    }, 'Please enter valid email addresses separated by commas'),
  
  agenda: z.string()
    .min(10, 'Agenda must be at least 10 characters')
    .max(1000, 'Agenda must not exceed 1000 characters'),
  
  milestoneId: z.string()
    .min(1, 'Please select a milestone')
});

export type ScheduleMeetingFormData = z.infer<typeof scheduleMeetingSchema>;
export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;
export type Document = z.infer<typeof documentSchema>;
export type MilestoneFormData = z.infer<typeof milestoneSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;