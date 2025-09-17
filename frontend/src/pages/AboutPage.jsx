import React from 'react';
import heroImage from '@/assets/hero-image.jpg'

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 w-full">
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
            About <span className="text-primary">AutoCare</span>
          </h1>
          <p className="mt-8 text-2xl lg:text-3xl text-muted-foreground max-w-4xl leading-relaxed">
            Precision detailing and maintenance powered by experts and technology.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 grid lg:grid-cols-2 gap-20 xl:gap-28 items-start">
          <div className="space-y-10">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground">Our Story</h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              For over a decade, AutoCare has delivered premium automotive services with a single goal:
              keep your vehicle looking and running like new. Our certified technicians combine
              modern tools with meticulous craftsmanship to achieve showroom results.
            </p>
            <ul className="grid sm:grid-cols-2 gap-5 text-foreground max-w-3xl">
              <li className="flex items-start gap-4"><span className="mt-2 h-2 w-2 rounded-full bg-primary" /> Ceramic Coating & Paint Correction</li>
              <li className="flex items-start gap-4"><span className="mt-2 h-2 w-2 rounded-full bg-primary" /> Engine Diagnostics & Maintenance</li>
              <li className="flex items-start gap-4"><span className="mt-2 h-2 w-2 rounded-full bg-primary" /> Interior Deep Cleaning</li>
              <li className="flex items-start gap-4"><span className="mt-2 h-2 w-2 rounded-full bg-primary" /> Body Repair & Refinishing</li>
            </ul>
            <div className="pt-6">
              <a href="/services" className="inline-block bg-primary text-primary-foreground hover:bg-primary-dark px-10 py-4 rounded-md text-lg font-semibold">
                Explore Services
              </a>
            </div>
          </div>
          <div className="relative space-y-8">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg-custom border border-border">
              <img src={heroImage} alt="AutoCare workshop" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold text-primary">10+</div>
                <div className="text-base mt-2 text-secondary-foreground/80">Years</div>
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold text-primary">500+</div>
                <div className="text-base mt-2 text-secondary-foreground/80">Happy Clients</div>
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold text-primary">24/7</div>
                <div className="text-base mt-2 text-secondary-foreground/80">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-10 sm:h-16 lg:h-24" />
    </div>
  );
}
