import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cambodia = await prisma.destination.upsert({
    where: { slug: 'salesjobscambodia' },
    update: {},
    create: {
      slug: 'salesjobscambodia',
      name: 'Cambodia',
      description: 'Discover exciting sales opportunities in a rapidly growing economy with a unique blend of rich culture and modern development.',
      image: '/images/place/cambodia.webp', // We might need a placeholder or just use an existing one
      stats: {
        averageEarnings: '$60k - $120k',
        costOfLiving: 'Low ($1.5k/mo)',
        visaType: 'Business Visa'
      },
      isActive: true,
    },
  });

  const uk = await prisma.destination.upsert({
    where: { slug: 'salesjobsunitedkingdom' },
    update: {},
    create: {
      slug: 'salesjobsunitedkingdom',
      name: 'United Kingdom',
      description: 'Experience a dynamic, fast-paced sales environment in one of the world\'s leading business hubs, offering exceptional career growth.',
      image: '/images/place/uk.webp', // Placeholder
      stats: {
        averageEarnings: '£50k - £120k+',
        costOfLiving: 'High (£3k/mo)',
        visaType: 'Skilled Worker Visa'
      },
      isActive: true,
    },
  });

  console.log('Inserted:', cambodia, uk);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });