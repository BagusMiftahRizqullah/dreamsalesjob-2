import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamsalesjob-2.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: "Dream Sales Jobs | Travel the World with High-Paying Sales Careers",
  description: "Specialist recruitment for Australians, New Zealanders, & British looking to trade the 9-5 for luxury resort careers or remote work worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dream Sales Jobs',
    url: 'https://dreamsalesjob-2.vercel.app',
    logo: 'https://dreamsalesjob-2.vercel.app/images/logo-utama.webp',
    sameAs: [
      'https://www.linkedin.com/company/dreamsalesjobs',
      'https://twitter.com/dreamsalesjobs',
    ],
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
