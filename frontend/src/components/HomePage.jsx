import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import Footer from "./layouts/FooterSection";

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
      <Footer />
    </div>
  );
};

export default HomePage;
