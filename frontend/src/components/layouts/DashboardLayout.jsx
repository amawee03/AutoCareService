import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserIcon,
  WrenchIcon,
  CalendarIcon,
  ClipboardIcon,
  SettingsIcon,
  DollarSignIcon,
  PackageIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';

const SidebarItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardLayout = ({ children, userRole, userName }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getMenuItems = () => {
    const baseItems = [
      {
        to: '/dashboard',
        icon: <ClipboardIcon size={20} />,
        label: 'Dashboard',
      },
    ];

    const roleSpecificItems = {
      admin: [
        {
          to: '/admin/services',
          icon: <WrenchIcon size={20} />,
          label: 'Services',
        },
        {
          to: '/admin/users',
          icon: <UserIcon size={20} />,
          label: 'Users',
        },
        {
          to: '/admin/appointments',
          icon: <CalendarIcon size={20} />,
          label: 'Appointments',
        },
        {
          to: '/admin/settings',
          icon: <SettingsIcon size={20} />,
          label: 'Settings',
        },
      ],
      user: [
        {
          to: '/services',
          icon: <WrenchIcon size={20} />,
          label: 'Services',
        },
        {
          to: '/appointments',
          icon: <CalendarIcon size={20} />,
          label: 'My Appointments',
        },
      ],
      'financial-manager': [
        {
          to: '/financial/payments',
          icon: <DollarSignIcon size={20} />,
          label: 'Payments',
        },
        {
          to: '/financial/invoices',
          icon: <ClipboardIcon size={20} />,
          label: 'Invoices',
        },
        {
          to: '/financial/reports',
          icon: <ClipboardIcon size={20} />,
          label: 'Reports',
        },
      ],
      'inventory-manager': [
        {
          to: '/inventory/materials',
          icon: <PackageIcon size={20} />,
          label: 'Materials',
        },
        {
          to: '/inventory/equipment',
          icon: <WrenchIcon size={20} />,
          label: 'Equipment',
        },
      ],
      'service-employee': [
        {
          to: '/service-employee/appointments',
          icon: <CalendarIcon size={20} />,
          label: 'Appointments',
        },
      ],
      'service-advisor': [
        {
          to: '/service-advisor/appointments',
          icon: <CalendarIcon size={20} />,
          label: 'Appointments',
        },
        {
          to: '/service-advisor/customers',
          icon: <UserIcon size={20} />,
          label: 'Customers',
        },
      ],
    };

    // Convert role to key format (e.g., "Service Advisor" -> "service-advisor")
    const roleKey = userRole.toLowerCase().replace(' ', '-');
    return [
      ...baseItems,
      ...(roleSpecificItems[roleKey] || []),
    ];
  };

  const menuItems = getMenuItems();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <button onClick={toggleMobileMenu} className="md:hidden mr-4">
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <Link to="/" className="text-2xl font-bold text-red-600">
              AutoCare
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
              Welcome, {userName}
            </span>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white">
          <div className="p-4">
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {userRole}
              </p>
              <p className="text-sm font-medium text-gray-900">{userName}</p>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.to}
                />
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
                  <LogOutIcon size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={toggleMobileMenu}
            ></div>
            <div className="relative flex flex-col w-72 max-w-xs bg-white h-full">
              <div className="p-4">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {userRole}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                </div>
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <SidebarItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      active={location.pathname === item.to}
                    />
                  ))}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
                      <LogOutIcon size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
     
    </div>
  );
};

export default DashboardLayout;