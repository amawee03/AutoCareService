import React from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AutoCare</h3>
            <p className="text-gray-300 text-sm">
              Professional automotive services for all your vehicle needs.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-red-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-red-400">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-red-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-red-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Us</h4>
            <address className="text-sm text-gray-300 not-italic">
              <p>123 Service Road</p>
              <p>Automotive City, AC 12345</p>
              <p className="mt-2">Email: info@autocare.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-400">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} AutoCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;