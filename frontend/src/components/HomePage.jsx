import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main>
        <section>
          <HeroSection />
        </section>
        <section>
          <ServicesSection />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
