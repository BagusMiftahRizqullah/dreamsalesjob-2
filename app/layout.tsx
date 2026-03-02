import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamsalesjobs.com'),
  title: "Dream Sales Jobs",
  description: "High-ticket sales roles in Bali, Vietnam, Thailand, and remote.",
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
    url: 'https://dreamsalesjobs.com',
    logo: 'https://dreamsalesjobs.com/logo.png',
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
