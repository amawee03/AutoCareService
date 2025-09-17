import React, { useState, useEffect } from 'react';

const ServiceCatalogue = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/packages');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message);
      // Fallback to sample data if API fails
      setServices(getSampleServices());
    } finally {
      setLoading(false);
    }
  };

  const getSampleServices = () => [
    {
      _id: '1',
      pkgName: 'Basic Car Wash',
      description: 'Complete exterior wash and dry with premium soap and wax protection.',
      category: 'wash',
      price: 19.99,
      duration: '30 minutes',
      features: ['Exterior wash', 'Wheel cleaning', 'Tire shine', 'Basic wax'],
      tags: ['popular', 'quick'],
      status: 'active'
    },
    {
      _id: '2',
      pkgName: 'Premium Detail',
      description: 'Comprehensive interior and exterior detailing for showroom finish.',
      category: 'detail',
      price: 89.99,
      duration: '2 hours',
      features: ['Full wash', 'Clay bar treatment', 'Paint correction', 'Interior vacuum', 'Leather conditioning'],
      tags: ['premium', 'comprehensive'],
      status: 'active'
    },
    {
      _id: '3',
      pkgName: 'Oil Change Service',
      description: 'Professional oil change with premium synthetic oil and filter replacement.',
      category: 'maintenance',
      price: 49.99,
      duration: '45 minutes',
      features: ['Synthetic oil', 'Oil filter', 'Fluid top-off', 'Basic inspection'],
      tags: ['maintenance', 'essential'],
      status: 'active'
    },
    {
      _id: '4',
      pkgName: 'Tire Rotation & Balance',
      description: 'Professional tire rotation and balancing for optimal performance and longevity.',
      category: 'maintenance',
      price: 39.99,
      duration: '30 minutes',
      features: ['Tire rotation', 'Wheel balancing', 'Tire pressure check', 'Visual inspection'],
      tags: ['maintenance', 'safety'],
      status: 'active'
    },
    {
      _id: '5',
      pkgName: 'Ceramic Coating',
      description: 'Advanced ceramic coating application for long-lasting paint protection.',
      category: 'protection',
      price: 299.99,
      duration: '4 hours',
      features: ['Paint preparation', 'Ceramic coating', 'Curing time', 'Quality guarantee'],
      tags: ['premium', 'protection'],
      status: 'active'
    },
    {
      _id: '6',
      pkgName: 'Interior Deep Clean',
      description: 'Thorough interior cleaning including seats, carpets, and dashboard.',
      category: 'detail',
      price: 69.99,
      duration: '1.5 hours',
      features: ['Seat cleaning', 'Carpet shampoo', 'Dashboard treatment', 'Air freshener'],
      tags: ['interior', 'deep clean'],
      status: 'active'
    }
  ];

  const handleBookService = (serviceId) => {
    // Placeholder for booking functionality
    alert(`Booking service: ${serviceId}`);
  };

  const handleViewDetails = (serviceId) => {
    // Placeholder for details functionality
    alert(`Viewing details for: ${serviceId}`);
  };

  if (loading) {
    return (
      <div className="catalogue-container">
        <div className="loading">
          <h2>Loading Services...</h2>
          <p>Please wait while we fetch our service packages</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogue-container">
        <div className="error">
          <h2>Unable to load services</h2>
          <p>Error: {error}</p>
          <p>Showing sample services instead</p>
        </div>
        <div className="catalogue-header">
          <h2 className="catalogue-title">Service Catalogue</h2>
          <p className="catalogue-subtitle">
            Professional automotive services designed to keep your vehicle in perfect condition
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard 
              key={service._id} 
              service={service} 
              onBook={handleBookService}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="catalogue-container">
      <div className="catalogue-header">
        <h2 className="catalogue-title">Service Catalogue</h2>
        <p className="catalogue-subtitle">
          Professional automotive services designed to keep your vehicle in perfect condition
        </p>
      </div>
      
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard 
            key={service._id} 
            service={service} 
            onBook={handleBookService}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service, onBook, onViewDetails }) => {
  return (
    <div className="service-card">
      <div className="service-header">
        <div>
          <h3 className="service-name">{service.pkgName}</h3>
        </div>
        <span className="service-category">{service.category}</span>
      </div>
      
      <p className="service-description">{service.description}</p>
      
      <div className="service-details">
        <div className="service-price">${service.price}</div>
        <div className="service-duration">{service.duration}</div>
      </div>
      
      {service.features && service.features.length > 0 && (
        <div className="service-features">
          <h4 className="features-title">Features</h4>
          <ul className="features-list">
            {service.features.map((feature, index) => (
              <li key={index} className="feature-tag">{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="service-actions">
        <button 
          className="btn btn-primary"
          onClick={() => onBook(service._id)}
        >
          Book Now
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onViewDetails(service._id)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCatalogue;
