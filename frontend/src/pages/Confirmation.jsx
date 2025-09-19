import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressStepper from '@/components/ui/ProgressStepper';

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    success,
    appointmentDetails,
    paymentMethod,
    transactionId,
  } = location.state || {
    success: true,
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
    paymentMethod: 'card',
    transactionId: 'TXN123456789',
  };

  const formattedDate =
    appointmentDetails.date instanceof Date
      ? appointmentDetails.date.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Date not available';

  const handleDownloadReceipt = () => {
    alert('Receipt download functionality would be implemented here.');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRetryPayment = () => {
    navigate('/payment', { state: { appointmentDetails } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressStepper currentStep={4} />
      <div className="max-w-2xl mx-auto">
        {success ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Your appointment is confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for choosing AutoCare. We look forward to serving you.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-left">
                Booking Details
              </h2>
              <div className="text-left border-b pb-3 mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{appointmentDetails.service.name}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{appointmentDetails.time}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">
                    {appointmentDetails.vehicle.make} {appointmentDetails.vehicle.model} ({appointmentDetails.vehicle.year})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration:</span>
                  <span className="font-medium">{appointmentDetails.vehicle.registrationNumber}</span>
                </div>
              </div>
              <div className="text-left border-b pb-3 mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">₹{appointmentDetails.service.price + 1000}</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">
                  * A confirmation email has been sent to your registered email address.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Receipt
              </button>
              <button
                onClick={handleGoToDashboard}
                className="flex items-center justify-center px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
            <p className="text-gray-600 mb-8">
              We were unable to process your payment. Please try again or use a different payment method.
            </p>
            <button
              onClick={handleRetryPayment}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Retry Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
