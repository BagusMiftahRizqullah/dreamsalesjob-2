import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  slug: string;
  title: string;
  destination: string;
  type: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: Date;
  employer: {
    name: string;
    logo: string;
    verified: boolean;
    description: string;
    website: string;
  };
  industry: string;
  seniority: string;
  isActive: boolean;
}

const JobSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    type: { type: String, required: true, default: 'full-time' },
    location: { type: String, required: true },
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      period: { type: String, default: 'month' },
    },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    postedDate: { type: Date, default: Date.now },
    employer: {
      name: { type: String, required: true },
      logo: { type: String, default: '' },
      verified: { type: Boolean, default: false },
      description: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    industry: { type: String, default: '' },
    seniority: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model recompilation error in Next.js dev environment
const Job = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;
