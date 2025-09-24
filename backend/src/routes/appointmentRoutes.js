import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

/**
 * POST /api/appointments
 * Creates an appointment + simulates payment + assigns bay
 */
router.post("/", async (req, res) => {
  try {
    const { customerName, vehicle, packageId, preferredTime, duration, notes } = req.body;
    const startTime = new Date(preferredTime);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // 15-minute buffer for next service
    const bufferEnd = new Date(endTime.getTime() + 15 * 60000);

    // Find overlapping appointments
    const overlapping = await Appointment.find({
      preferredTime: { $lt: bufferEnd },
      $expr: {
        $gt: [
          { $add: ["$preferredTime", { $multiply: ["$duration", 60000] }] },
          startTime
        ]
      }
    });

    if (overlapping.length >= 3) {
      return res.status(400).json({ message: "All bays are booked for this time slot." });
    }

    // Assign free bay
    const bays = [1, 2, 3];
    const occupied = overlapping.map(o => o.bayNumber);
    const freeBay = bays.find(b => !occupied.includes(b));
    if (!freeBay) return res.status(400).json({ message: "No bays available at this time." });

    // Create appointment with bay assignment
    const appointment = new Appointment({
      customerName,
      vehicle,
      packageId,
      preferredTime: startTime,
      duration,
      notes,
      bayNumber: freeBay,
      paymentStatus: "paid" // Sandbox: payment instantly marked as paid
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked and paid successfully (sandbox).",
      appointment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/appointments/calendar
 * Fetch all paid appointments for service calendar
 */
router.get("/calendar", async (req, res) => {
  try {
    const events = await Appointment.find({ paymentStatus: "paid" }).sort({ preferredTime: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
