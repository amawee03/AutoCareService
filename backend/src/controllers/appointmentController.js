import Appointment from '../models/Appointment.js';
import ServicePackage from '../models/ServicePackage.js';
import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';

// Get all appointments
export async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate('servicePackage')
      .sort({ appointmentDate: 1, startTime: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getAllAppointments controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get available time slots for a specific date and service
export async function getAvailableTimeSlots(req, res) {
  try {
    const { date, serviceId } = req.query;
    
    if (!date || !serviceId) {
      return res.status(400).json({ message: "Date and serviceId parameters are required" });
    }

    if (!mongoose.isValidObjectId(serviceId)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    // Get service package details
    const servicePackage = await ServicePackage.findById(serviceId);
    if (!servicePackage) {
      return res.status(404).json({ message: "Service package not found" });
    }

    const appointmentDate = new Date(date);
    const serviceDuration = servicePackage.duration; // Duration in minutes
    const gapMinutes = 20; // 20-minute gap between appointments

    // Get all confirmed appointments for the date
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.find({
      appointmentDate: {
        $gte: startOfDay,
        $lt: endOfDay
      },
      status: { $ne: 'cancelled' }
    }).sort({ startTime: 1 });

    // Get active reservations for the same date
    const activeReservations = await Reservation.find({
      appointmentDate: {
        $gte: startOfDay,
        $lt: endOfDay
      },
      status: 'pending',
      expiresAt: { $gt: new Date() }
    }).sort({ startTime: 1 });

    // Combine appointments and reservations
    const allBookings = [...existingAppointments, ...activeReservations];

    // Generate available time slots based on booking windows
    const availableSlots = [];
    
    for (const window of servicePackage.bookingTimeWindows) {
      const [startHour, startMin] = window.start.split(':').map(Number);
      const [endHour, endMin] = window.end.split(':').map(Number);
      
      const windowStart = new Date(appointmentDate);
      windowStart.setHours(startHour, startMin, 0, 0);
      
      const windowEnd = new Date(appointmentDate);
      windowEnd.setHours(endHour, endMin, 0, 0);

      // Generate candidate start times every 15 minutes
      const candidateStart = new Date(windowStart);
      while (candidateStart < windowEnd) {
        const candidateEnd = new Date(candidateStart.getTime() + serviceDuration * 60000);
        
        // Check if this candidate slot fits within the booking window
        if (candidateEnd <= windowEnd) {
          const candidateStartTime = candidateStart.toTimeString().slice(0, 5);
          const candidateEndTime = candidateEnd.toTimeString().slice(0, 5);
          
          // Check for conflicts with existing bookings
          const hasConflict = allBookings.some(booking => {
            const bookingStart = new Date(booking.appointmentDate);
            const [hours, minutes] = booking.startTime.split(':');
            bookingStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            const bookingEnd = new Date(booking.appointmentDate);
            const [endHours, endMinutes] = booking.endTime.split(':');
            bookingEnd.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

            // Check for overlap
            const overlaps = (candidateStart < bookingEnd && candidateEnd > bookingStart);
            
            // Check 20-minute gap rule
            const gapBefore = Math.abs(candidateStart - bookingEnd) < gapMinutes * 60000;
            const gapAfter = Math.abs(bookingStart - candidateEnd) < gapMinutes * 60000;
            
            return overlaps || gapBefore || gapAfter;
          });

          if (!hasConflict) {
            availableSlots.push({
              startTime: candidateStartTime,
              endTime: candidateEndTime,
              duration: serviceDuration,
              available: true
            });
          }
        }
        
        // Move to next candidate (15-minute intervals)
        candidateStart.setTime(candidateStart.getTime() + 15 * 60000);
      }
    }

    res.status(200).json({
      date: date,
      serviceId: serviceId,
      serviceName: servicePackage.pkgName,
      duration: serviceDuration,
      availableSlots: availableSlots
    });
  } catch (error) {
    console.error("Error in getAvailableTimeSlots controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Initiate appointment reservation (before payment)
export async function initiateAppointment(req, res) {
  try {
    const {
      servicePackageId,
      customer,
      appointmentDate,
      startTime,
      notes
    } = req.body;

    // Validate required fields
    if (!servicePackageId || !customer || !appointmentDate || !startTime) {
      return res.status(400).json({ 
        message: "servicePackageId, customer, appointmentDate, and startTime are required" 
      });
    }

    // Validate service package exists
    if (!mongoose.isValidObjectId(servicePackageId)) {
      return res.status(400).json({ message: "Invalid service package ID" });
    }

    const servicePackage = await ServicePackage.findById(servicePackageId);
    if (!servicePackage) {
      return res.status(404).json({ message: "Service package not found" });
    }

    // Calculate end time based on service duration
    const duration = servicePackage.duration; // Duration in minutes
    const startTimeDate = new Date(`${appointmentDate}T${startTime}:00`);
    const endTimeDate = new Date(startTimeDate.getTime() + duration * 60000);
    const endTime = endTimeDate.toTimeString().slice(0, 5);

    // Check for conflicts with existing appointments and reservations
    const appointmentDateObj = new Date(appointmentDate);
    const startOfDay = new Date(appointmentDateObj);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDateObj);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.find({
      appointmentDate: { $gte: startOfDay, $lt: endOfDay },
      status: { $ne: 'cancelled' }
    });

    const activeReservations = await Reservation.find({
      appointmentDate: { $gte: startOfDay, $lt: endOfDay },
      status: 'pending',
      expiresAt: { $gt: new Date() }
    });

    const allBookings = [...existingAppointments, ...activeReservations];
    const gapMinutes = 20;

    // Check for conflicts
    const hasConflict = allBookings.some(booking => {
      const bookingStart = new Date(booking.appointmentDate);
      const [hours, minutes] = booking.startTime.split(':');
      bookingStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const bookingEnd = new Date(booking.appointmentDate);
      const [endHours, endMinutes] = booking.endTime.split(':');
      bookingEnd.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

      // Check for overlap
      const overlaps = (startTimeDate < bookingEnd && endTimeDate > bookingStart);
      
      // Check 20-minute gap rule
      const gapBefore = Math.abs(startTimeDate - bookingEnd) < gapMinutes * 60000;
      const gapAfter = Math.abs(bookingStart - endTimeDate) < gapMinutes * 60000;
      
      return overlaps || gapBefore || gapAfter;
    });

    if (hasConflict) {
      return res.status(409).json({ 
        message: "Time slot is no longer available. Please select another time." 
      });
    }

    // Create reservation
    const reservation = new Reservation({
      servicePackage: servicePackageId,
      customer,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime,
      duration,
      notes: notes || '',
      payment: {
        amount: 1000 // LKR 1000
      }
    });

    const savedReservation = await reservation.save();
    await savedReservation.populate('servicePackage');

    res.status(201).json({
      reservationId: savedReservation._id,
      servicePackage: savedReservation.servicePackage,
      appointmentDate: savedReservation.appointmentDate,
      startTime: savedReservation.startTime,
      endTime: savedReservation.endTime,
      duration: savedReservation.duration,
      customer: savedReservation.customer,
      notes: savedReservation.notes,
      payment: savedReservation.payment,
      expiresAt: savedReservation.expiresAt
    });
  } catch (error) {
    console.error("Error in initiateAppointment controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Confirm appointment after successful payment
export async function confirmAppointment(req, res) {
  try {
    const { reservationId, transactionId } = req.body;

    if (!reservationId || !transactionId) {
      return res.status(400).json({ 
        message: "reservationId and transactionId are required" 
      });
    }

    // Find the reservation
    const reservation = await Reservation.findById(reservationId).populate('servicePackage');
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found or expired" });
    }

    if (reservation.status !== 'pending') {
      return res.status(400).json({ message: "Reservation is no longer valid" });
    }

    if (reservation.expiresAt < new Date()) {
      return res.status(400).json({ message: "Reservation has expired" });
    }

    // Create confirmed appointment
    const appointment = new Appointment({
      servicePackage: reservation.servicePackage._id,
      customer: reservation.customer,
      appointmentDate: reservation.appointmentDate,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      duration: reservation.duration,
      notes: reservation.notes,
      status: 'confirmed',
      payment: {
        amount: reservation.payment.amount,
        status: 'completed',
        transactionId: transactionId,
        paymentMethod: 'sandbox'
      }
    });

    const savedAppointment = await appointment.save();
    await savedAppointment.populate('servicePackage');

    // Update reservation status
    reservation.status = 'confirmed';
    await reservation.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error in confirmAppointment controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new appointment (legacy - for direct creation)
export async function createAppointment(req, res) {
  try {
    const {
      servicePackageId,
      customer,
      appointmentDate,
      startTime,
      notes
    } = req.body;

    // Validate required fields
    if (!servicePackageId || !customer || !appointmentDate || !startTime) {
      return res.status(400).json({ 
        message: "servicePackageId, customer, appointmentDate, and startTime are required" 
      });
    }

    // Validate service package exists
    if (!mongoose.isValidObjectId(servicePackageId)) {
      return res.status(400).json({ message: "Invalid service package ID" });
    }

    const servicePackage = await ServicePackage.findById(servicePackageId);
    if (!servicePackage) {
      return res.status(404).json({ message: "Service package not found" });
    }

    // Calculate end time based on service duration
    const duration = servicePackage.duration; // Duration in minutes
    const startTimeDate = new Date(`${appointmentDate}T${startTime}:00`);
    const endTimeDate = new Date(startTimeDate.getTime() + duration * 60000);
    const endTime = endTimeDate.toTimeString().slice(0, 5);

    // Create appointment
    const appointment = new Appointment({
      servicePackage: servicePackageId,
      customer,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime,
      duration,
      notes: notes || '',
      payment: {
        amount: 1000, // LKR 1000
        status: 'pending'
      }
    });

    const savedAppointment = await appointment.save();
    await savedAppointment.populate('servicePackage');

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error in createAppointment controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update appointment status after payment
export async function updateAppointmentPayment(req, res) {
  try {
    const { appointmentId } = req.params;
    const { paymentStatus, transactionId } = req.body;

    if (!mongoose.isValidObjectId(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.payment.status = paymentStatus;
    appointment.payment.transactionId = transactionId || '';
    
    if (paymentStatus === 'completed') {
      appointment.status = 'confirmed';
    }

    const updatedAppointment = await appointment.save();
    await updatedAppointment.populate('servicePackage');

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error in updateAppointmentPayment controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get appointment by ID
export async function getAppointmentById(req, res) {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id).populate('servicePackage');
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error in getAppointmentById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Cancel appointment
export async function cancelAppointment(req, res) {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = 'cancelled';
    const updatedAppointment = await appointment.save();
    await updatedAppointment.populate('servicePackage');

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error in cancelAppointment controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
