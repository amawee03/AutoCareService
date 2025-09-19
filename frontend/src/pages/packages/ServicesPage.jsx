import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Card } from '@/components/ui/card'
import ProgressStepper from '@/components/ui/ProgressStepper'
import Footer from '@/components/layouts/FooterSection'

const ServiceCatalogue = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [packagesList, setPackagesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch packages from API when component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/packages')
        if (!res.ok) throw new Error('Failed to load packages')
        const data = await res.json()
        setPackagesList(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e.message || 'Failed to load packages')
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  // Filter services based on category and search term
  const filteredServices = packagesList
    .filter((service) => filter === 'all' || service.category === filter)
    .filter((service) =>
      service.pkgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  if (loading) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-2">AutoCare Services</h1>
          <p className="text-gray-600 text-center mb-8">
            Select a service package to get started
          </p>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading services...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-2">AutoCare Services</h1>
          <p className="text-gray-600 text-center mb-8">
            Select a service package to get started
          </p>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">Error: {error}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (packagesList.length === 0) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-2">AutoCare Services</h1>
          <p className="text-gray-600 text-center mb-8">
            Select a service package to get started
          </p>
          <div className="text-center py-12 space-y-6">
            <div className="text-gray-400 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">No Service Packages Available</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Service packages will appear here once they are added by the admin. 
              Check back later or contact support for assistance.
            </p>
            <div className="pt-4">
              <Link 
                to="/admin" 
                className="inline-block bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-200"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">AutoCare Services</h1>
        <p className="text-gray-600 text-center mb-8">
          Select a service package to get started
        </p>
        
        <ProgressStepper currentStep={1} />

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium border ${
                filter === 'all' 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } rounded-l-md`}
            >
              All Services
            </button>
            <button
              onClick={() => setFilter('maintenance')}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                filter === 'maintenance' 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setFilter('detailing')}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                filter === 'detailing' 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } rounded-r-md`}
            >
              Detailing
            </button>
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-4 text-center">
            <p className="text-gray-600">
              Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.005-6-2.709M15 3.291A7.962 7.962 0 0112 2c-2.34 0-4.5 1.005-6 2.709"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `No services match your search "${searchTerm}". Try different keywords.`
                : 'No services available in this category.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.pkgName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{service.pkgName}</h3>
                    <span className="text-lg font-bold text-red-600">
                      ₹{service.price?.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {service.duration && (
                    <div className="mb-3">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                        Duration: {service.duration}
                      </span>
                    </div>
                  )}
                  
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="mb-4">
                      <ul className="text-sm space-y-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-600 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-gray-500 text-xs">
                            +{service.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full capitalize">
                      {service.category}
                    </span>
                    
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium">
                      Select Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ServiceCatalogue