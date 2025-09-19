import ServicePackage from '../models/ServicePackage.js';
import Appointment from '../models/Appointment.js';
import mongoose from 'mongoose';

// Get all service packages (admin)
export async function getAllServices(req, res) {
  try {
    const services = await ServicePackage.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getAllServices controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create or update service package (admin)
export async function createOrUpdateService(req, res) {
  try {
    const {
      pkgName,
      description,
      category,
      price,
      duration,
      bookingTimeWindows,
      features,
      tags,
      image,
      status
    } = req.body;

    // Validate required fields
    if (!pkgName || !description || !category || price === undefined || !duration) {
      return res.status(400).json({ 
        message: "pkgName, description, category, price, and duration are required" 
      });
    }

    // Validate duration is a number
    if (typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ 
        message: "Duration must be a positive number (minutes)" 
      });
    }

    // Validate booking time windows
    if (bookingTimeWindows && Array.isArray(bookingTimeWindows)) {
      for (const window of bookingTimeWindows) {
        if (!window.start || !window.end) {
          return res.status(400).json({ 
            message: "Each booking time window must have start and end times" 
          });
        }
        // Validate time format (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(window.start) || !timeRegex.test(window.end)) {
          return res.status(400).json({ 
            message: "Time windows must be in HH:MM format" 
          });
        }
      }
    }

    const serviceData = {
      pkgName,
      description,
      category,
      price: Number(price),
      duration: Number(duration),
      bookingTimeWindows: bookingTimeWindows || [{ start: "09:00", end: "17:00" }],
      features: Array.isArray(features) ? features : [],
      tags: Array.isArray(tags) ? tags : [],
      image: image || '',
      status: status || 'active'
    };

    const service = new ServicePackage(serviceData);
    const savedService = await service.save();

    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error in createOrUpdateService controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update service package (admin)
export async function updateService(req, res) {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const updateData = req.body;
    
    // Validate duration if provided
    if (updateData.duration && (typeof updateData.duration !== 'number' || updateData.duration <= 0)) {
      return res.status(400).json({ 
        message: "Duration must be a positive number (minutes)" 
      });
    }

    // Validate booking time windows if provided
    if (updateData.bookingTimeWindows && Array.isArray(updateData.bookingTimeWindows)) {
      for (const window of updateData.bookingTimeWindows) {
        if (!window.start || !window.end) {
          return res.status(400).json({ 
            message: "Each booking time window must have start and end times" 
          });
        }
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(window.start) || !timeRegex.test(window.end)) {
          return res.status(400).json({ 
            message: "Time windows must be in HH:MM format" 
          });
        }
      }
    }

    const updatedService = await ServicePackage.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service package not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error in updateService controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete service package (admin)
export async function deleteService(req, res) {
  try {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    // Check if service has any appointments
    const hasAppointments = await Appointment.findOne({ servicePackage: id });
    if (hasAppointments) {
      return res.status(400).json({ 
        message: "Cannot delete service package with existing appointments" 
      });
    }

    const deletedService = await ServicePackage.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service package not found" });
    }

    res.status(200).json({ message: "Service package deleted successfully" });
  } catch (error) {
    console.error("Error in deleteService controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all appointments (admin)
export async function getAllAppointmentsAdmin(req, res) {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startOfDay, $lt: endOfDay };
    }

    const appointments = await Appointment.find(query)
      .populate('servicePackage')
      .sort({ appointmentDate: -1, startTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Error in getAllAppointmentsAdmin controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get appointment statistics (admin)
export async function getAppointmentStats(req, res) {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const stats = await Appointment.aggregate([
      {
        $match: {
          appointmentDate: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$payment.amount' }
        }
      }
    ]);

    const totalAppointments = await Appointment.countDocuments();
    const totalRevenue = await Appointment.aggregate([
      { $group: { _id: null, total: { $sum: '$payment.amount' } } }
    ]);

    res.status(200).json({
      monthlyStats: stats,
      totalAppointments,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    console.error("Error in getAppointmentStats controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
