import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Calendar, Clock, CreditCard, ArrowRight, Download } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentSuccess = () => {
  const location = useLocation();
  const navigate = useLocation();
  const { appointment, transactionId } = location.state || {};

  const handleBookAnother = () => {
    navigate('/appointment');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      appointmentId: appointment?._id,
      transactionId: transactionId,
      service: appointment?.servicePackage?.pkgName,
      amount: appointment?.payment?.amount,
      date: appointment?.appointmentDate,
      time: `${appointment?.startTime} - ${appointment?.endTime}`,
      customer: appointment?.customer?.name
    };
    
    // For now, just show an alert
    alert('Receipt download feature will be implemented soon!');
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Appointment Not Found</h1>
          <p className="text-muted-foreground mb-6">The appointment details could not be loaded.</p>
          <Button onClick={handleGoHome}>Go Home</Button>
        </div>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.appointmentDate);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-success-foreground" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Appointment Confirmed!
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your appointment has been successfully booked and payment processed.
          </p>
        </div>

        {/* Appointment Details Card */}
        <Card className="mb-12 border-success/20 bg-success/5">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Appointment Details</h2>
              <p className="text-muted-foreground">Your appointment is confirmed and ready</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Service Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Service Details</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={appointment.servicePackage?.image ? `/uploads/${appointment.servicePackage.image.split('/').pop()}` : 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={appointment.servicePackage?.pkgName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{appointment.servicePackage?.pkgName}</h4>
                      <Badge variant="secondary" className="mt-1">{appointment.servicePackage?.category}</Badge>
                      <p className="text-sm text-muted-foreground mt-2">{appointment.servicePackage?.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Customer Information</h3>
                  <div className="space-y-2">
                    <p className="text-foreground"><strong>Name:</strong> {appointment.customer?.name}</p>
                    <p className="text-foreground"><strong>Email:</strong> {appointment.customer?.email}</p>
                    <p className="text-foreground"><strong>Phone:</strong> {appointment.customer?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Appointment Schedule */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Appointment Schedule</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          {appointmentDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          {appointment.startTime} - {appointment.endTime}
                        </p>
                        <p className="text-sm text-muted-foreground">Duration: {appointment.duration} minutes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Payment Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Transaction ID: {transactionId}</p>
                        <p className="text-sm text-muted-foreground">Amount: LKR {appointment.payment?.amount?.toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      Payment Completed
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Special Notes</h3>
                <p className="text-muted-foreground">{appointment.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">What's Next?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">You'll receive a confirmation email with all details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Reminder Notification</h3>
                <p className="text-sm text-muted-foreground">We'll send you a reminder 24 hours before your appointment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Arrive on Time</h3>
                <p className="text-sm text-muted-foreground">Please arrive 10 minutes before your scheduled time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg h-14"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Receipt
          </Button>
          <Button
            onClick={handleBookAnother}
            size="lg"
            className="px-8 py-4 text-lg h-14 bg-primary hover:bg-primary-dark"
          >
            Book Another Service
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button
            onClick={handleGoHome}
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg h-14"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
