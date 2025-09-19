import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  servicePackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServicePackage',
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'expired', 'cancelled'],
    default: 'pending'
  },
  payment: {
    amount: {
      type: Number,
      required: true,
      default: 1000 // LKR 1000
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: {
      type: String,
      default: ''
    }
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 } // TTL index for automatic cleanup
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Set expiration time to 15 minutes from creation
reservationSchema.pre('save', function(next) {
  if (this.isNew) {
    this.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  }
  next();
});

export default mongoose.model('Reservation', reservationSchema);
