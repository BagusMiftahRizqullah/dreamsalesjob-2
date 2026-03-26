import Link from 'next/link';
import Image from 'next/image';
import { Destination } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg h-full flex flex-col block">
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-100">
        <Image
          src={destination.image}
          alt={destination.name}
          title={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold tracking-tight">{destination.name}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4 flex flex-col flex-1">
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {destination.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-4 mt-auto">
          <div>
            <span className="block text-xs font-semibold text-slate-500 uppercase">Avg Earnings</span>
            <span className="font-medium text-navy-900">{destination.stats.averageEarnings}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-500 uppercase">Cost of Living</span>
            <span className="font-medium text-navy-900">{destination.stats.costOfLiving}</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full justify-between text-primary-600 hover:text-primary-700 hover:bg-primary-50 group-hover:underline">
            Explore Roles <ArrowRight className="h-4 w-4 ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
}
