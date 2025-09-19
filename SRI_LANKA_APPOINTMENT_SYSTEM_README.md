# AutoCare Appointment Booking System - Sri Lanka

A comprehensive full-stack appointment booking system specifically designed for AutoCare Service Management in Sri Lanka, featuring precise business rules, localization, and advanced scheduling algorithms.

## 🇱🇰 Sri Lanka Localization

### Currency & Pricing
- **Currency**: Sri Lankan Rupees (LKR)
- **Fixed Appointment Fee**: LKR 1,000 per appointment
- **Display Format**: LKR 1,000 (with proper formatting)

### Phone Number Validation
- **Format**: Sri Lankan mobile numbers
- **Accepted Formats**: 
  - `+94 77 123 4567`
  - `077 123 4567`
- **Validation Regex**: `^(\+94|0)[0-9]{9}$`

## 🏗️ System Architecture

### Backend (Node.js + Express + MongoDB)
```
backend/src/
├── models/
│   ├── ServicePackage.js      # Enhanced with booking windows & duration
│   ├── Appointment.js         # Confirmed appointments
│   └── Reservation.js         # TTL-based reservations
├── controllers/
│   ├── appointmentController.js  # Core booking logic
│   ├── paymentController.js      # Sandbox payment processing
│   └── adminController.js        # Admin management
└── routes/
    ├── appointmentRoutes.js      # Booking API endpoints
    └── adminRoutes.js            # Admin API endpoints
```

### Frontend (React + Tailwind CSS)
```
frontend/src/components/
├── ServiceSelection.jsx        # Service package selection
├── AppointmentCalendar.jsx     # Date/time slot picker
├── AppointmentForm.jsx         # Customer details form
├── PaymentPage.jsx            # Payment processing
├── AppointmentSuccess.jsx     # Success confirmation
└── AppointmentFailure.jsx     # Error handling
```

## 📋 Business Rules Implementation

### Service Package Configuration
- **Duration**: Exact minutes (not strings)
- **Booking Windows**: Configurable time ranges (e.g., 09:00-17:00)
- **Price**: Service-specific pricing
- **Status**: Active/Inactive management

### Time Slot Management
- **Service Duration**: Exact package duration (no buffer)
- **Gap Rule**: 20-minute minimum gap between appointments
- **Scheduling**: 15-minute candidate intervals
- **Conflict Prevention**: Real-time availability checking

### Reservation System
- **TTL**: 15-minute reservation hold
- **Status Flow**: pending → confirmed → completed
- **Auto-cleanup**: Expired reservations removed automatically

## 🔧 API Endpoints

### Public Endpoints
```
GET  /api/admin/services                    # Get all services
GET  /api/appointments/available            # Get available time slots
POST /api/appointments/initiate             # Create reservation
POST /api/appointments/payment/sandbox      # Process payment
POST /api/appointments/confirm              # Confirm appointment
GET  /api/appointments/:id                  # Get appointment details
```

### Admin Endpoints
```
GET    /api/admin/services                  # List all services
POST   /api/admin/services                  # Create service package
PUT    /api/admin/services/:id              # Update service package
DELETE /api/admin/services/:id              # Delete service package
GET    /api/admin/appointments              # List appointments
GET    /api/admin/appointments/stats        # Get statistics
```

## 🎯 User Flow

### 1. Service Selection (`/appointment`)
- Browse available service packages
- View duration, pricing, and features
- Select desired service

### 2. Calendar Selection (`/appointment/calendar`)
- Choose available date
- Select time slot based on service duration
- Real-time availability checking

### 3. Customer Details (`/appointment/details`)
- Enter customer information
- Sri Lankan phone number validation
- Add special notes

### 4. Payment Processing (`/appointment/payment`)
- Enter payment card details
- Process LKR 1,000 payment
- Sandbox payment simulation

### 5. Confirmation (`/appointment/success` or `/appointment/failure`)
- Success: Appointment confirmed with details
- Failure: Error handling with retry options

## ⚙️ Advanced Features

### Availability Algorithm
```javascript
// Example: 50-minute service booking
// Booking at 01:00 → 01:50
// Next earliest booking: 02:10 → 03:00 (50 min + 20 min gap)

const hasConflict = allBookings.some(booking => {
  const overlaps = (candidateStart < bookingEnd && candidateEnd > bookingStart);
  const gapBefore = Math.abs(candidateStart - bookingEnd) < gapMinutes * 60000;
  const gapAfter = Math.abs(bookingStart - candidateEnd) < gapMinutes * 60000;
  return overlaps || gapBefore || gapAfter;
});
```

### Reservation TTL
```javascript
// 15-minute reservation hold
reservationSchema.pre('save', function(next) {
  if (this.isNew) {
    this.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  }
  next();
});
```

### Payment Flow
1. **Initiate**: Create reservation with TTL
2. **Process**: Sandbox payment (90% success rate)
3. **Confirm**: Convert reservation to confirmed appointment
4. **Cleanup**: Expired reservations auto-removed

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/autocare_sri_lanka
```

## 📊 Database Schema

### ServicePackage
```javascript
{
  pkgName: String,
  description: String,
  category: String,
  price: Number,                    // Service price
  duration: Number,                 // Duration in minutes
  bookingTimeWindows: [{           // Configurable time windows
    start: String,                  // "09:00"
    end: String                     // "17:00"
  }],
  features: [String],
  tags: [String],
  image: String,
  status: String                   // active/inactive
}
```

### Reservation
```javascript
{
  servicePackage: ObjectId,
  customer: {
    name: String,
    email: String,
    phone: String                   // Sri Lankan format
  },
  appointmentDate: Date,
  startTime: String,               // "HH:MM"
  endTime: String,                 // "HH:MM"
  duration: Number,                // Minutes
  notes: String,
  status: String,                  // pending/confirmed/expired/cancelled
  payment: {
    amount: Number,                // LKR 1000
    status: String,                // pending/completed/failed
    transactionId: String
  },
  expiresAt: Date                  // TTL for auto-cleanup
}
```

### Appointment
```javascript
{
  servicePackage: ObjectId,
  customer: {
    name: String,
    email: String,
    phone: String
  },
  appointmentDate: Date,
  startTime: String,
  endTime: String,
  duration: Number,
  notes: String,
  status: String,                  // pending/confirmed/completed/cancelled
  payment: {
    amount: Number,                // LKR 1000
    status: String,                // pending/completed/failed
    transactionId: String,
    paymentMethod: String          // sandbox
  }
}
```

## 🧪 Testing the System

### 1. Start Services
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### 2. Test Booking Flow
1. Visit `http://localhost:5173/appointment`
2. Select a service package
3. Choose date and time slot
4. Enter customer details (Sri Lankan phone format)
5. Process payment (LKR 1,000)
6. Confirm appointment

### 3. Test Admin Functions
1. Visit `http://localhost:5173/admin`
2. Manage service packages
3. View appointment statistics
4. Monitor booking patterns

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **Phone Validation**: Sri Lankan phone number format enforcement
- **TTL Management**: Automatic reservation cleanup
- **Conflict Prevention**: Real-time availability checking
- **Error Handling**: Comprehensive error management

## 📱 Mobile Responsiveness

- **Responsive Design**: Mobile-first approach
- **Touch-Friendly**: Large buttons and touch targets
- **Sri Lankan UX**: Localized user experience
- **Fast Loading**: Optimized for mobile networks

## 🎨 UI/UX Features

### Design System
- **Color Palette**: AutoCare red, black, white theme
- **Typography**: Large, readable fonts
- **Spacing**: 60-30-10 rule implementation
- **Localization**: Sri Lankan currency and phone formats

### User Experience
- **Progress Indication**: Clear step-by-step process
- **Real-time Validation**: Instant feedback
- **Error Recovery**: Helpful error messages
- **Confirmation Flow**: Clear success/failure states

## 🔄 Future Enhancements

- **SMS Notifications**: Sri Lankan SMS integration
- **Email Confirmations**: Automated email system
- **Calendar Integration**: Google Calendar sync
- **Recurring Appointments**: Repeat booking support
- **Customer Portal**: Dedicated customer dashboard
- **Analytics Dashboard**: Advanced reporting
- **Real Payment Gateway**: Integration with local banks

## 📞 Support

For technical support in Sri Lanka:
- **Email**: support@autocare.lk
- **Phone**: +94 77 123 4567
- **Hours**: Monday-Friday, 9AM-6PM (Sri Lanka Time)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built specifically for AutoCare Service Management in Sri Lanka** 🇱🇰
