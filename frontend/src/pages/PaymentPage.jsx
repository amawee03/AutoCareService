import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProgressStepper from '@/components/ui/ProgressStepper'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { appointmentDetails } = location.state || {
    appointmentDetails: {
      service: {
        id: 0,
        name: 'Premium Detailing',
        price: 4999,
        description: '',
        category: 'detailing',
        image: '',
      },
      date: new Date(),
      time: '10:00 AM',
      vehicle: {
        id: 1,
        make: 'Honda',
        model: 'Civic',
        year: '2019',
        registrationNumber: 'MH01AB1234',
        color: 'Red',
      },
    },
  }

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardDetails({
      ...cardDetails,
      [name]: value,
    })
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      navigate('/confirmation', {
        state: {
          success: true,
          appointmentDetails,
          paymentMethod,
          transactionId:
            'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      })
    }, 2000)
  }

  const formattedDate =
    appointmentDetails.date instanceof Date
      ? appointmentDetails.date.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Date not available'

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressStepper currentStep={3} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Payment</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="border-b pb-4 mb-4">
                <h3 className="font-semibold text-lg mb-2">
                  {appointmentDetails.service.name}
                </h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Charge</span>
                  <span>₹{appointmentDetails.service.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Appointment Charge</span>
                  <span>₹1,000</span>
                </div>
              </div>
              <div className="border-b pb-4 mb-4">
                <h3 className="font-semibold mb-2">Appointment Details</h3>
                <div className="text-gray-600">
                  <div className="mb-1">Date: {formattedDate}</div>
                  <div className="mb-1">Time: {appointmentDetails.time}</div>
                </div>
              </div>
              <div className="border-b pb-4 mb-4">
                <h3 className="font-semibold mb-2">Vehicle Details</h3>
                <div className="text-gray-600">
                  <div className="mb-1">
                    {appointmentDetails.vehicle.make}{' '}
                    {appointmentDetails.vehicle.model} (
                    {appointmentDetails.vehicle.year})
                  </div>
                  <div>
                    Reg: {appointmentDetails.vehicle.registrationNumber}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-red-600">
                  ₹{appointmentDetails.service.price + 1000}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 rounded-md border transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`flex-1 py-3 rounded-md border transition-colors ${
                    paymentMethod === 'wallet'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Mobile Wallet
                </button>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardDetails.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full bg-red-600 text-white py-3 rounded-lg font-medium ${
                      isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                    }`}
                  >
                    {isProcessing ? 'Processing Payment...' : 'Pay ₹' + (appointmentDetails.service.price + 1000)}
                  </button>
                </form>
              )}

              {paymentMethod === 'wallet' && (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-6">
                    <button type="button" className="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      Paytm
                    </button>
                    <button type="button" className="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      Google Pay
                    </button>
                    <button type="button" className="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      PhonePe
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full bg-red-600 text-white py-3 rounded-lg font-medium ${
                      isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                    }`}
                  >
                    {isProcessing ? 'Processing Payment...' : 'Pay ₹' + (appointmentDetails.service.price + 1000)}
                  </button>
                </form>
              )}

              <div className="mt-4 text-center text-sm text-gray-500">
                Your payment information is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
