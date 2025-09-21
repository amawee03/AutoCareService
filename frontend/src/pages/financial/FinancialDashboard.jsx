import React from 'react';
import StatsCard from '@/components/dashboards/StatsCard';
import {
  DollarSignIcon,
  TrendingUpIcon,
  FileTextIcon,
  CreditCardIcon,
} from 'lucide-react';

export default function FinancialDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3,25,780',
      icon: <DollarSignIcon size={24} className="text-green-600" />,
      change: { value: '8%', positive: true },
    },
    {
      title: 'Pending Payments',
      value: '₹42,500',
      icon: <CreditCardIcon size={24} className="text-amber-600" />,
    },
    {
      title: 'Invoices Generated',
      value: 145,
      icon: <FileTextIcon size={24} className="text-blue-600" />,
    },
    {
      title: 'Monthly Growth',
      value: '12%',
      icon: <TrendingUpIcon size={24} className="text-red-600" />,
      change: { value: '3%', positive: true },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
      {/* Add more dashboard widgets here */}
    </div>
  );
}
