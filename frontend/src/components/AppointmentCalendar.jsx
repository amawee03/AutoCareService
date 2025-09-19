import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentCalendar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.selectedService;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if no service selected
  useEffect(() => {
    if (!selectedService) {
      navigate('/appointment');
    }
  }, [selectedService, navigate]);

  // Get available time slots for selected date
  const fetchAvailableSlots = async (date) => {
    setLoading(true);
    try {
      const dateString = date.toISOString().split('T')[0];
      const res = await fetch(`/api/appointments/available?date=${dateString}&serviceId=${selectedService._id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    fetchAvailableSlots(date);
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Navigate to next step
  const handleContinue = () => {
    if (selectedDate && selectedSlot) {
      navigate('/appointment/details', {
        state: {
          selectedService,
          selectedDate: selectedDate.toISOString().split('T')[0],
          selectedSlot
        }
      });
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push({
        date: new Date(date),
        isCurrentMonth,
        isPast,
        isSelected
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  if (!selectedService) {
    return null;
  }

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Choose Date & Time
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Select your preferred appointment date and time slot
          </p>
        </div>

        {/* Selected Service Info */}
        <Card className="mb-12 border-primary/20 bg-primary-muted/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedService.image ? `/uploads/${selectedService.image.split('/').pop()}` : 'https://via.placeholder.com/80x80?text=No+Image'}
                  alt={selectedService.pkgName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{selectedService.pkgName}</h3>
                  <p className="text-muted-foreground">{selectedService.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">LKR {selectedService.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selectedService.duration} minutes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Select Date</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth(-1)}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium text-foreground min-w-[120px] text-center">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth(1)}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => !day.isPast && day.isCurrentMonth && handleDateSelect(day.date)}
                    disabled={day.isPast || !day.isCurrentMonth}
                    className={`
                      h-10 w-10 rounded-lg text-sm font-medium transition-colors
                      ${day.isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : day.isPast || !day.isCurrentMonth
                        ? 'text-muted-foreground/50 cursor-not-allowed'
                        : 'hover:bg-primary-muted text-foreground cursor-pointer'
                      }
                    `}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Available Times</h2>
              </div>

              {!selectedDate ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Select a date to view available time slots</p>
                </div>
              ) : loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading available slots...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">No available slots for this date</p>
                  <p className="text-sm text-muted-foreground mt-2">Please select another date</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        w-full p-4 rounded-lg border text-left transition-colors
                        ${selectedSlot?.startTime === slot.startTime
                          ? 'border-primary bg-primary-muted/20 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-primary-muted/10'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{slot.startTime} - {slot.endTime}</p>
                          <p className="text-sm text-muted-foreground">Available</p>
                        </div>
                        {selectedSlot?.startTime === slot.startTime && (
                          <div className="w-4 h-4 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        {selectedDate && selectedSlot && (
          <div className="text-center mt-12">
            <div className="bg-card border border-border rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Selected Appointment</h3>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-lg font-medium text-foreground">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSlot.startTime} - {selectedSlot.endTime}
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {selectedService.duration} minutes
                </Badge>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-12 py-4 text-xl h-16"
              onClick={handleContinue}
            >
              Continue to Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
