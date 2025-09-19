import express from "express";
import { 
  getAllServices,
  createOrUpdateService,
  updateService,
  deleteService,
  getAllAppointmentsAdmin,
  getAppointmentStats
} from "../controllers/adminController.js";
import ratelimiter from "../middleware/rateLimiter.js";

const router = express.Router();

// Service management routes
router.get("/services", getAllServices);
router.post("/services", createOrUpdateService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// Appointment management routes
router.get("/appointments", getAllAppointmentsAdmin);
router.get("/appointments/stats", getAppointmentStats);

export default router;