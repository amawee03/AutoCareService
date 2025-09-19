import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CreditCard, Lock, ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedService, selectedDate, selectedSlot, customerDetails } = location.state || {};
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if no appointment data
  useEffect(() => {
    if (!selectedService || !selectedDate || !selectedSlot || !customerDetails) {
      navigate('/appointment');
    }
  }, [selectedService, selectedDate, selectedSlot, customerDetails, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) { // 16 digits + 3 spaces
        setCardDetails(prev => ({ ...prev, [name]: formatted }));
      }
    }
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
      if (formatted.length <= 5) {
        setCardDetails(prev => ({ ...prev, [name]: formatted }));
      }
    }
    // Limit CVV to 3-4 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 4) {
        setCardDetails(prev => ({ ...prev, [name]: formatted }));
      }
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardDetails.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!cardDetails.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    }
    
    if (!cardDetails.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardDetails.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async () => {
    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    
    try {
      // Step 1: Initiate appointment reservation
      const reservationData = {
        servicePackageId: selectedService._id,
        customer: {
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone
        },
        appointmentDate: selectedDate,
        startTime: selectedSlot.startTime,
        notes: customerDetails.notes || ''
      };

      const reservationRes = await fetch('/api/appointments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (!reservationRes.ok) {
        const errorData = await reservationRes.json();
        throw new Error(errorData.message || 'Failed to create reservation');
      }

      const reservation = await reservationRes.json();

      // Step 2: Process payment
      const paymentRes = await fetch('/api/appointments/payment/sandbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationId: reservation.reservationId,
          amount: 1000, // Fixed LKR 1000
          cardDetails: {
            last4: cardDetails.cardNumber.slice(-4),
            expiry: cardDetails.expiryDate
          }
        })
      });

      const paymentResult = await paymentRes.json();

      if (paymentResult.success) {
        // Step 3: Confirm appointment after successful payment
        const confirmRes = await fetch('/api/appointments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservationId: reservation.reservationId,
            transactionId: paymentResult.transactionId
          })
        });

        if (!confirmRes.ok) {
          throw new Error('Failed to confirm appointment');
        }

        const confirmedAppointment = await confirmRes.json();

        // Navigate to success page
        navigate('/appointment/success', {
          state: {
            appointment: confirmedAppointment,
            transactionId: paymentResult.transactionId
          }
        });
      } else {
        // Navigate to failure page
        navigate('/appointment/failure', {
          state: {
            error: paymentResult.message,
            appointment: null
          }
        });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      navigate('/appointment/failure', {
        state: {
          error: error.message || 'Payment processing failed. Please try again.',
          appointment: null
        }
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleBack = () => {
    navigate('/appointment/details', {
      state: { selectedService, selectedDate, selectedSlot, customerDetails }
    });
  };

  if (!selectedService || !selectedDate || !selectedSlot || !customerDetails) {
    return null;
  }

  const appointmentDate = new Date(selectedDate);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Payment
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Complete your appointment booking with secure payment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Payment Form */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Payment Details</h2>
              </div>
              
              <form className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-base font-medium">
                    Card Number *
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={`h-12 text-base ${errors.cardNumber ? 'border-destructive' : ''}`}
                  />
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Card Name */}
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-base font-medium">
                    Cardholder Name *
                  </Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`h-12 text-base ${errors.cardName ? 'border-destructive' : ''}`}
                  />
                  {errors.cardName && (
                    <p className="text-sm text-destructive">{errors.cardName}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-base font-medium">
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`h-12 text-base ${errors.expiryDate ? 'border-destructive' : ''}`}
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-destructive">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-base font-medium">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`h-12 text-base ${errors.cvv ? 'border-destructive' : ''}`}
                    />
                    {errors.cvv && (
                      <p className="text-sm text-destructive">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 p-4 bg-primary-muted/20 border border-primary/30 rounded-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>
              
              {/* Service Details */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedService.image ? `/uploads/${selectedService.image.split('/').pop()}` : 'https://via.placeholder.com/60x60?text=No+Image'}
                    alt={selectedService.pkgName}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{selectedService.pkgName}</h3>
                    <Badge variant="secondary" className="text-xs">{selectedService.category}</Badge>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {appointmentDate.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">
                    {selectedSlot.startTime} - {selectedSlot.endTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{selectedService.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">{customerDetails.name}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">LKR {selectedService.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium">LKR 0</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">LKR 1,000</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 text-base"
                  disabled={processing}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={processPayment}
                  disabled={processing}
                  className="flex-1 h-12 text-base bg-primary hover:bg-primary-dark"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay LKR 1,000
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
