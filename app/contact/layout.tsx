import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Dream Sales Jobs',
  description: 'Get in touch with Dream Sales Jobs. We are here to answer your questions about international sales roles, relocation, and hiring top talent.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
