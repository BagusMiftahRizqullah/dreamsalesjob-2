/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/bali',
        destination: 'https://dreamsalesjobs.com/destinations/salesjobsbali',
        permanent: true,
      },
      {
        source: '/salesjobsbali',
        destination: 'https://dreamsalesjobs.com/destinations/salesjobsbali',
        permanent: true,
      },
      {
        source: '/vietnam',
        destination: 'https://dreamsalesjobs.com/destinations/salesjobsvietnam',
        permanent: true,
      },
      {
        source: '/salesjobsvietnam',
        destination: 'https://dreamsalesjobs.com/destinations/salesjobsvietnam',
        permanent: true,
      },
      {
        source: '/thailand',
        destination: 'https://dreamsalesjobs.com/destinations/salesjobsthailand',
        permanent: true,
      },
      {
        source: '/salesjobsthailand',
        destination: 'https://dreamsalesjobs.com/destinations/salesjobsthailand',
        permanent: true,
      },
      {
        source: '/remote',
        destination: 'https://dreamsalesjobs.com/destinations/remotesalesjobs',
        permanent: true,
      },
      {
        source: '/remotesalesjobs',
        destination: 'https://dreamsalesjobs.com/destinations/remotesalesjobs',
        permanent: true,
      },
      {
        source: '/indonesia',
        destination: 'https://dreamsalesjobs.com/destinations/indonesia',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

module.exports = nextConfig;

