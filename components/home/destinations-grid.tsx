import Link from 'next/link';
import { Destination } from '@/types';
import { DestinationCard } from '@/components/destinations/destination-card';

interface DestinationsGridProps {
  destinations: Destination[];
  title?: string;
  description?: string;
}

export function DestinationsGrid({ destinations, title, description }: DestinationsGridProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy-900">
            {title || "Where Do You Want to Work?"}
          </h2>
          <p className="mt-4 text-slate-600">
            {description || "From tropical islands to bustling cities, we have roles in the most desirable locations in Southeast Asia."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
