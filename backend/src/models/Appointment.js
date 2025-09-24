import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  vehicle: { type: String, required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "ServicePackage" },
  preferredTime: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // minutes
  notes: String,
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  bayNumber: { type: Number, required: true } // assigned automatically
});

export default mongoose.model("Appointment", appointmentSchema);
