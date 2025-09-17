import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">AutoCare</h3>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              Premium automotive care and detailing services you can trust. 
              Professional excellence meets cutting-edge technology.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary mb-4">Contact Us</h4>
            <div className="space-y-3">
              <p className="flex items-center justify-center md:justify-start gap-3 text-lg">
                <Phone className="text-primary" size={20} /> 
                <span className="text-secondary-foreground/90">(555) 123-4567</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3 text-lg">
                <Mail className="text-primary" size={20} /> 
                <span className="text-secondary-foreground/90">support@autocare.com</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3 text-lg">
                <MapPin className="text-primary" size={20} /> 
                <span className="text-secondary-foreground/90">123 Main Street, Colombo</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary mb-4">Follow Us</h4>
            <p className="text-lg text-secondary-foreground/90">
              Stay connected with us on social media for updates and special offers.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <span className="text-secondary-foreground/70 hover:text-primary transition-colors cursor-pointer">Instagram</span>
              <span className="text-secondary-foreground/70 hover:text-primary transition-colors cursor-pointer">Facebook</span>
              <span className="text-secondary-foreground/70 hover:text-primary transition-colors cursor-pointer">Twitter</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="text-center">
            <p className="text-lg text-secondary-foreground/70">
              © {new Date().getFullYear()} AutoCare. All rights reserved. | Premium automotive services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
