import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProgressStepper from '@/components/ui/ProgressStepper'
import Calendar from '@/components/Calendar'
import TimeSelector from '@/components/TimeSelector'
import VehicleSelector from '@/components/VehicleSelector'
import AddVehicleModal from '@/components/AddVehicleModal'

const PackageDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [notes, setNotes] = useState('')
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)

  // Sample service data
  const service = {
    id: parseInt(id || '0'),
    name: 'Premium Detailing',
    price: 4999,
    description:
      'Our premium detailing package is designed to restore your vehicle to showroom condition. This comprehensive service includes a thorough exterior wash, clay bar treatment, high-quality wax application, complete interior cleaning, and leather conditioning.',
    category: 'detailing',
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
    image:
      'https://images.unsplash.com/photo-1575844264771-892081089af5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  }

  // Sample vehicles data
  const vehicles = [
    {
      id: 1,
      make: 'Honda',
      model: 'Civic',
      year: '2019',
      registrationNumber: 'MH01AB1234',
      color: 'Red',
    },
    {
      id: 2,
      make: 'Toyota',
      model: 'Fortuner',
      year: '2021',
      registrationNumber: 'MH02CD5678',
      color: 'White',
    },
  ]

  const handleAddVehicle = (vehicleData) => {
    console.log('New vehicle:', vehicleData)
    setShowAddVehicleModal(false)
    alert('Vehicle added successfully!')
  }

  const handleProceedToPayment = () => {
    if (!selectedDate || !selectedTime || !selectedVehicle) {
      alert('Please select a date, time, and vehicle to proceed.')
      return
    }

    const appointmentDetails = {
      service,
      date: selectedDate,
      time: selectedTime,
      vehicle: selectedVehicle,
      notes,
    }

    console.log('Appointment details:', appointmentDetails)

    navigate('/payment', {
      state: { appointmentDetails },
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressStepper currentStep={2} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{service.name}</h1>
            <div className="text-2xl font-bold text-red-600">
              ₹{service.price}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Included Services</h2>
            <ul className="list-disc list-inside text-gray-700">
              {service.includedServices.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center text-gray-700 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Estimated Time: {service.estimatedTime}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Select Appointment Date</h2>
          <Calendar onDateSelect={setSelectedDate} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Select Time Slot</h2>
          <TimeSelector onTimeSelect={setSelectedTime} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Select Vehicle</h2>
        <VehicleSelector
          vehicles={vehicles}
          onVehicleSelect={setSelectedVehicle}
          onAddVehicle={() => setShowAddVehicleModal(true)}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Additional Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests or information we should know about your vehicle?"
          className="w-full border border-gray-300 rounded p-3 h-32"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleProceedToPayment}
          className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition duration-200"
        >
          Proceed to Payment
        </button>
      </div>

      <AddVehicleModal
        isOpen={showAddVehicleModal}
        onClose={() => setShowAddVehicleModal(false)}
        onSave={handleAddVehicle}
      />
    </div>
  )
}

export default PackageDetails
