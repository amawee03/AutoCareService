import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// POST: Simulate payment
router.post("/pay", async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.paymentStatus === "paid") {
      return res.status(400).json({ message: "Appointment already paid" });
    }

    // Simulate payment (sandbox)
    // In real scenario, integrate Stripe/PayHere sandbox API here
    const paymentSuccess = true; // always succeed in sandbox

    if (paymentSuccess) {
      appointment.paymentStatus = "paid";
      await appointment.save();
      return res.status(200).json({ message: "Payment successful", appointment });
    } else {
      return res.status(400).json({ message: "Payment failed" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
