import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ServiceList from '@/components/services/ServiceList';
import ServiceForm from '@/components/services/ServiceForm';
import Modal from '@/components/ui/modal';
import { PlusIcon } from 'lucide-react';

export default function ServiceManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewingServiceId, setViewingServiceId] = useState(null);

  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Basic Maintenance',
      price: 2999,
      description:
        'Essential maintenance service including oil change, filter replacement, and basic inspection.',
      category: 'maintenance',
      image:
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      estimatedTime: '1 hour',
    },
    {
      id: 2,
      name: 'Premium Detailing',
      price: 4999,
      description:
        'Complete interior and exterior detailing with premium products for a showroom finish.',
      category: 'detailing',
      image:
        'https://images.unsplash.com/photo-1575844264771-892081089af5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      estimatedTime: '3 hours',
      includedServices: [
        'Exterior hand wash and dry',
        'Clay bar treatment to remove contaminants',
        'High-quality carnauba wax application',
        'Wheel and tire cleaning and dressing',
        'Complete interior vacuum and dusting',
        'Leather cleaning and conditioning',
        'Interior plastic and vinyl protection',
        'Window and mirror cleaning',
      ],
    },
    {
      id: 3,
      name: 'Full Service',
      price: 7999,
      description:
        'Comprehensive service including fluid changes, brake inspection, and complete vehicle check.',
      category: 'maintenance',
      image:
        'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      estimatedTime: '4 hours',
    },
  ]);

  const handleAddService = (serviceData) => {
    const newService = {
      ...serviceData,
      id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
    };
    setServices([...services, newService]);
    setShowForm(false);
  };

  const handleUpdateService = (serviceData) => {
    if (!editingService) return;
    const updatedServices = services.map((service) =>
      service.id === editingService.id
        ? { ...serviceData, id: service.id }
        : service
    );
    setServices(updatedServices);
    setEditingService(null);
    setShowForm(false);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter((service) => service.id !== id));
    }
  };

  const handleViewService = (id) => {
    setViewingServiceId(id);
  };

  const viewingService =
    viewingServiceId !== null
      ? services.find((service) => service.id === viewingServiceId)
      : null;

  const closeViewModal = () => setViewingServiceId(null);
  const closeFormModal = () => {
    setShowForm(false);
    setEditingService(null);
  };

  return (
    <DashboardLayout userRole="Admin" userName="Admin User">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
        <button
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          <PlusIcon size={18} />
          Add Service
        </button>
      </div>

      {/* Service Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={closeFormModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <ServiceForm
          onSubmit={editingService ? handleUpdateService : handleAddService}
          initialData={editingService || undefined}
          buttonText={editingService ? 'Update Service' : 'Add Service'}
        />
      </Modal>

      {/* Service View Modal */}
      <Modal
        isOpen={viewingService !== null}
        onClose={closeViewModal}
        title={viewingService?.name || 'Service Details'}
        size="lg"
      >
        {viewingService && (
          <div>
            <div className="mb-6">
              <img
                src={viewingService.image}
                alt={viewingService.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{viewingService.name}</h2>
                <div className="text-xl font-bold text-red-600">
                  ₹{viewingService.price}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{viewingService.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Category</h3>
                  <p className="text-gray-700 capitalize">
                    {viewingService.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Estimated Time</h3>
                  <p className="text-gray-700">{viewingService.estimatedTime}</p>
                </div>
              </div>

              {viewingService.includedServices &&
                viewingService.includedServices.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Included Services
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 bg-gray-50 p-4 rounded-lg">
                      {viewingService.includedServices.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}
      </Modal>

      <ServiceList
        services={services}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
        onView={handleViewService}
      />
    </DashboardLayout>
  );
}
