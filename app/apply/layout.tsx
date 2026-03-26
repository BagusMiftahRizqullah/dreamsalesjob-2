import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply Now | Dream Sales Jobs',
  description: 'Apply for high-paying international sales jobs in Bali, Thailand, and Vietnam. Start your journey to a dream lifestyle and lucrative career abroad.',
  alternates: {
    canonical: '/apply',
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
