import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  experience: string;
  destination: string;
  jobSlug?: string;
  jobTitle?: string;
  resumeUrl?: string; // If we add file upload later
  status: 'new' | 'reviewed' | 'contacted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, default: '' },
    experience: { type: String, required: true },
    destination: { type: String, required: true },
    jobSlug: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    status: { 
      type: String, 
      enum: ['new', 'reviewed', 'contacted', 'rejected'],
      default: 'new' 
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation error in Next.js dev environment
const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
