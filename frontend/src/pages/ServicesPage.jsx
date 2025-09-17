import React, { useState } from 'react';
import ServicesSection from '@/components/ServicesSection';

const categories = ['All', 'Detailing', 'Maintenance', 'Repair', 'Bodywork'];

export default function ServicesPage() {
  const [active, setActive] = useState('All');

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-24 border-b border-border">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24">
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground tracking-tight">Choose Your Service Package</h1>
          <p className="mt-6 text-2xl lg:text-3xl text-muted-foreground max-w-4xl leading-relaxed">
            Professional automotive services with expert care for your vehicle.
          </p>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap gap-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                  active === c
                    ? 'bg-primary text-primary-foreground shadow-red'
                    : 'bg-secondary-light text-foreground hover:bg-primary-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="py-20">
        <ServicesSection showHeader={false} />
      </div>
    </div>
  );
}
