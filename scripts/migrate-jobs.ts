import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env variables manually since this is a standalone script
dotenv.config({ path: '.env.local' });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: '.env' });
}

const MONGODB_URI = process.env.MONGODB_URI!;

const JobSchema = new mongoose.Schema(
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
    timestamps: true,
  }
);

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

const JOBS_DIR = path.join(process.cwd(), 'content', 'jobs');

async function migrateJobs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    // Read all JSON files in the content/jobs directory
    const files = fs.readdirSync(JOBS_DIR).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.log('No JSON files found in content/jobs');
      process.exit(0);
    }

    console.log(`Found ${files.length} job files. Starting migration...`);

    let successCount = 0;
    let skipCount = 0;

    for (const file of files) {
      const filePath = path.join(JOBS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jobData = JSON.parse(fileContent);

      // Check if job already exists based on slug
      const existingJob = await Job.findOne({ slug: jobData.slug });
      
      if (existingJob) {
        console.log(`[SKIPPED] Job already exists: ${jobData.slug}`);
        skipCount++;
        continue;
      }

      // Map the JSON structure to our Mongoose Schema structure
      const newJob = new Job({
        slug: jobData.slug,
        title: jobData.title,
        destination: jobData.destination,
        type: jobData.type,
        location: jobData.location,
        salary: {
          min: jobData.salary?.min || 0,
          max: jobData.salary?.max || 0,
          currency: jobData.salary?.currency || 'USD',
          period: jobData.salary?.period || 'month',
        },
        description: jobData.description || '',
        requirements: jobData.requirements || [],
        responsibilities: jobData.responsibilities || [],
        postedDate: jobData.postedDate ? new Date(jobData.postedDate) : new Date(),
        employer: {
          name: jobData.employer?.name || 'Dream Sales Jobs',
          logo: jobData.employer?.logo || '',
          verified: jobData.employer?.verified || false,
          description: jobData.employer?.description || '',
          website: jobData.employer?.website || '',
        },
        industry: jobData.industry || '',
        seniority: jobData.seniority || '',
        isActive: true, // By default active
      });

      await newJob.save();
      console.log(`[SUCCESS] Migrated: ${jobData.title}`);
      successCount++;
    }

    console.log('\n--- MIGRATION COMPLETE ---');
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Skipped (already exist): ${skipCount}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrateJobs();