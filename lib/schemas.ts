import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export const applySchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Valid email is required.' }),
  phone: z.string().min(6, { message: 'Phone number is required.' }),
  linkedin: z.string().regex(/^(https?:\/\/)?(www\.)?linkedin\.com.*$/i, { message: 'Please provide a valid LinkedIn URL.' }).optional().or(z.literal('')),
  experience: z.string().min(10, { message: 'Please describe your sales experience.' }),
  destination: z.string().min(1, { message: 'Please select a preferred destination.' }),
  resume: z.any().optional(), // In a real app, this would be a file upload handler
});

export const hireSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name is required.' }),
  contactName: z.string().min(2, { message: 'Contact name is required.' }),
  email: z.string().email({ message: 'Valid work email is required.' }),
  website: z.string().regex(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/, { message: 'Please provide a valid website URL.' }),
  rolesToFill: z.string().min(1, { message: 'Please specify roles you are hiring for.' }),
  location: z.string().min(1, { message: 'Please specify the location.' }),
});
