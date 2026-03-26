import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env variables manually since this is a standalone script
dotenv.config({ path: '.env.local' });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: '.env' });
}

const MONGODB_URI = process.env.MONGODB_URI!;

const DestinationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stats: {
      averageEarnings: { type: String, default: '' },
      costOfLiving: { type: String, default: '' },
      visaType: { type: String, default: '' },
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);

const destinations = [
  {
    slug: 'salesjobsbali',
    name: 'Bali',
    description: 'The Island of Gods offers a perfect blend of luxury lifestyle and high-ticket sales opportunities in real estate and hospitality.',
    image: '/images/place/bali.webp',
    stats: {
      averageEarnings: '$80k - $150k',
      costOfLiving: 'Low ($2k/mo)',
      visaType: 'B211A / KITAS'
    }
  },
  {
    slug: 'salesjobsvietnam',
    name: 'Vietnam',
    description: 'One of the fastest-growing economies in Asia. Huge demand for tech sales and recruitment consultants in Ho Chi Minh City.',
    image: '/images/place/vietnam.webp',
    stats: {
      averageEarnings: '$50k - $100k',
      costOfLiving: 'Very Low ($1.2k/mo)',
      visaType: 'Business Visa'
    }
  },
   {
    slug: 'salesjobsthailand',
    name: 'Thailand',
    description: 'From Bangkok skyscrapers to Phuket beaches, Thailand is a hub for expat sales professionals in finance, insurance, and marine industries.',
    image: '/images/place/thailand.webp',
    stats: {
      averageEarnings: '$60k - $120k',
      costOfLiving: 'Low ($1.5k/mo)',
      visaType: 'LTR / Non-B'
    }
  },
  {
    slug: 'remotesalesjobs',
    name: 'Remote',
    description: 'Work from anywhere with flexible schedules and global clients.',
    image: '/images/place/remote.webp',
    stats: {
      averageEarnings: '$60k - $120k',
      costOfLiving: 'Low ($1.5k/mo)',
      visaType: 'LTR / Non-B'
    }
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    description: 'Beyond Bali, opportunities abound in Jakarta’s bustling tech and business sectors.',
    image: '/images/place/indonesia.webp',
    stats: {
      averageEarnings: '$50k - $100k',
      costOfLiving: 'Low ($1.2k/mo)',
      visaType: 'KITAS'
    }
  }
];

async function migrateDestinations() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    let successCount = 0;
    let skipCount = 0;

    for (const destData of destinations) {
      const existingDest = await Destination.findOne({ slug: destData.slug });
      
      if (existingDest) {
        console.log(`[SKIPPED] Destination already exists: ${destData.slug}`);
        skipCount++;
        continue;
      }

      const newDest = new Destination(destData);
      await newDest.save();
      console.log(`[SUCCESS] Migrated: ${destData.name}`);
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

migrateDestinations();