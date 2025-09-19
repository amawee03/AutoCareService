import express from "express";
import { 
  getAllAppointments, 
  getAvailableTimeSlots, 
  createAppointment, 
  updateAppointmentPayment, 
  getAppointmentById, 
  cancelAppointment,
  initiateAppointment,
  confirmAppointment
} from "../controllers/appointmentController.js";
import { processPayment, verifyPayment } from "../controllers/paymentController.js";
import ratelimiter from "../middleware/rateLimiter.js";

const router = express.Router();

// Appointment routes
router.get("/", getAllAppointments);
router.get("/available", getAvailableTimeSlots);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.post("/initiate", initiateAppointment);
router.post("/confirm", confirmAppointment);
router.put("/:appointmentId/payment", updateAppointmentPayment);
router.put("/:id/cancel", cancelAppointment);

// Payment routes
router.post("/payment/sandbox", processPayment);
router.get("/payment/verify/:transactionId", verifyPayment);

export default router;
