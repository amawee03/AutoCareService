import React, { useState } from 'react';
import { Button } from './ui/button';
import { Car, Menu, X, User, Bell } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Services', to: '/services' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/#contact' },
  ];

  return (
    <nav className="bg-secondary text-secondary-foreground shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-lg">
              <Car className="h-9 w-9 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-primary">AutoCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors duration-300 relative group ${isActive ? 'text-primary' : 'hover:text-primary'}`
                }
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-primary hover:bg-primary/10 h-12 w-12">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-primary hover:bg-primary/10 h-12 w-12">
              <User className="h-6 w-6" />
            </Button>
            <Link to="/appointment">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 text-lg h-12">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-secondary-foreground hover:text-primary h-12 w-12"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-foreground/20">
            <div className="px-2 pt-3 pb-6 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-xl font-medium rounded-md transition-colors duration-300 ${isActive ? 'text-primary' : 'hover:text-primary hover:bg-primary/10'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-secondary-foreground/20">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-primary h-10 w-10">
                      <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-primary h-10 w-10">
                      <User className="h-5 w-5" />
                    </Button>
                  </div>
                  <Link to="/appointment">
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-5 py-3 text-lg">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;