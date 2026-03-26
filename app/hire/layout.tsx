import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire Sales Talent | Dream Sales Jobs',
  description: 'Connect with elite, pre-vetted international sales professionals ready to relocate and drive growth for your business in Southeast Asia.',
  alternates: {
    canonical: '/hire',
  },
};

export default function HireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
