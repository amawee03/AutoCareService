import React, { useState } from 'react';
import ServicesSection from '@/components/ServicesSection';

const categories = ['All', 'Detailing', 'Maintenance', 'Repair', 'Bodywork'];

export default function ServicesPage() {
  const [active, setActive] = useState('All');

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-16 border-b border-border">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground">Our Services</h1>
          <p className="mt-4 text-2xl lg:text-3xl text-muted-foreground max-w-3xl">
            Full catalogue of professional automotive services tailored to your vehicle.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  active === c
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary-light text-foreground hover:bg-primary-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="py-6">
        <ServicesSection />
      </div>
    </div>
  );
}
