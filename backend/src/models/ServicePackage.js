import mongoose from 'mongoose';

const ServicePackageSchema = new mongoose.Schema({
  pkgName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  bookingTimeWindows: {
    type: [{
      start: { type: String, required: true }, // "09:00"
      end: { type: String, required: true }    // "17:00"
    }],
    default: [{ start: "09:00", end: "17:00" }]
  },
  features: {
    type: [String], 
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String, 
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

const ServicePackage = mongoose.model("ServicePackage",ServicePackageSchema);

export default ServicePackage;
