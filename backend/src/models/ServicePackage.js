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
    type: String, 
    required: true,
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
