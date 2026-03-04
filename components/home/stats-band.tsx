export function StatsBand() {
  const stats = [
    { label: 'Candidates Placed', value: '450+' },
    { label: 'Verified Employers', value: '60+' },
    { label: 'Avg Time to Offer', value: '14 Days' },
    { label: 'Countries Covered', value: '3' },
  ];

  return (
    <section className="bg-navy-900 py-16 text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-navy-800/50">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-secondary-500 mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
