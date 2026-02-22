import { z } from 'zod';
export const clientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  verificationStatus: z.enum(["pending", "verified", "rejected"]).default("pending"),
  isEmailVerified: z.boolean().default(false),
  avatarFileId: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;