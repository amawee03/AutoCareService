# AutoCare Appointment Booking System

A full-stack appointment booking system for AutoCare Service Management with real-time availability, payment processing, and comprehensive booking management.

## 🚀 Features

### Core Functionality
- **Service Selection**: Browse and select from available service packages
- **Smart Calendar**: Dynamic date/time slot availability with conflict prevention
- **Appointment Details**: Customer information collection with special notes
- **Payment Processing**: Integrated sandbox payment gateway
- **Booking Management**: Complete appointment lifecycle management

### Key Features
- ✅ **Real-time Availability**: Only shows available time slots
- ✅ **Conflict Prevention**: 20-minute gap between appointments + 10-minute buffer
- ✅ **Service Duration Management**: Automatic time slot blocking based on service duration
- ✅ **Payment Integration**: Sandbox payment gateway with success/failure handling
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Form Validation**: Comprehensive client and server-side validation
- ✅ **Error Handling**: Graceful error handling and user feedback

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
```
backend/
├── src/
│   ├── models/
│   │   ├── Appointment.js          # Appointment schema
│   │   └── ServicePackage.js       # Service package schema
│   ├── controllers/
│   │   ├── appointmentController.js # Appointment CRUD operations
│   │   └── paymentController.js    # Payment processing
│   ├── routes/
│   │   ├── appointmentRoutes.js    # Appointment API endpoints
│   │   └── catalogueRoutes.js      # Service package endpoints
│   └── server.js                   # Express server configuration
```

### Frontend (React + Tailwind CSS)
```
frontend/src/
├── components/
│   ├── ServiceSelection.jsx        # Service package selection
│   ├── AppointmentCalendar.jsx     # Date/time slot selection
│   ├── AppointmentForm.jsx         # Customer details form
│   ├── PaymentPage.jsx            # Payment processing
│   ├── AppointmentSuccess.jsx     # Success confirmation
│   └── AppointmentFailure.jsx     # Payment failure handling
└── pages/
    └── AccountPage.jsx            # User account management
```

## 📋 API Endpoints

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/available?date=YYYY-MM-DD` - Get available time slots
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id/payment` - Update payment status
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### Payment
- `POST /api/appointments/payment` - Process payment
- `GET /api/appointments/payment/verify/:transactionId` - Verify payment

### Service Packages
- `GET /api/packages` - Get all service packages
- `POST /api/packages` - Create service package (Admin)
- `PUT /api/packages/:id` - Update service package (Admin)
- `DELETE /api/packages/:id` - Delete service package (Admin)

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
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
Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/autocare
```

## 🎯 User Flow

### 1. Service Selection (`/appointment`)
- Browse available service packages
- View service details, pricing, and duration
- Select desired service package

### 2. Calendar Selection (`/appointment/calendar`)
- View calendar with available dates
- Select preferred date
- Choose from available time slots
- System automatically blocks conflicting times

### 3. Customer Details (`/appointment/details`)
- Enter customer information (name, email, phone)
- Add special notes or instructions
- Review appointment summary

### 4. Payment Processing (`/appointment/payment`)
- Enter payment card details
- Process payment through sandbox gateway
- Handle payment success/failure

### 5. Confirmation (`/appointment/success` or `/appointment/failure`)
- Success: Show appointment details and next steps
- Failure: Display error message and retry options

## ⚙️ Business Logic

### Time Slot Management
- **Service Duration**: Each service has a defined duration
- **Buffer Time**: 10-minute buffer added to each appointment
- **Gap Between Appointments**: 20-minute minimum gap
- **Operating Hours**: 9:00 AM to 6:00 PM
- **Slot Duration**: 20-minute time slots

### Conflict Prevention
```javascript
// Example: 2-hour service with 10-minute buffer
const totalDuration = serviceDuration + 10; // 130 minutes
const gapBetweenAppointments = 20; // minutes

// Time slot calculation
const slotEnd = startTime + totalDuration;
const nextAvailableSlot = slotEnd + gapBetweenAppointments;
```

### Payment Processing
- **Fixed Amount**: ₹1000 per appointment
- **Sandbox Gateway**: Simulated payment processing
- **Success Rate**: 90% for demonstration
- **Transaction ID**: Generated for successful payments

## 🎨 UI/UX Features

### Design System
- **Color Palette**: AutoCare red, black, and white theme
- **Typography**: Large, readable fonts for better accessibility
- **Spacing**: Generous spacing following 60-30-10 rule
- **Responsive**: Mobile-first design approach

### User Experience
- **Progress Indication**: Clear step-by-step process
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during processing
- **Error Handling**: User-friendly error messages and recovery options

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: API rate limiting to prevent abuse
- **Data Sanitization**: Input sanitization and validation

## 📱 Mobile Responsiveness

- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Mobile Navigation**: Collapsible navigation menu
- **Optimized Forms**: Mobile-optimized form inputs

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to your preferred hosting service (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure API endpoints for production

## 📊 Database Schema

### Appointment Model
```javascript
{
  servicePackage: ObjectId,    // Reference to ServicePackage
  customer: {
    name: String,
    email: String,
    phone: String
  },
  appointmentDate: Date,
  startTime: String,           // "HH:MM" format
  endTime: String,             // "HH:MM" format
  duration: Number,            // Total duration in minutes
  notes: String,
  status: String,              // pending, confirmed, completed, cancelled
  payment: {
    amount: Number,
    status: String,            // pending, completed, failed
    transactionId: String,
    paymentMethod: String
  }
}
```

## 🔄 Future Enhancements

- **Email Notifications**: Automated email confirmations and reminders
- **SMS Notifications**: Text message alerts
- **Calendar Integration**: Google Calendar/Outlook integration
- **Recurring Appointments**: Support for recurring bookings
- **Customer Portal**: Dedicated customer dashboard
- **Admin Analytics**: Booking analytics and reporting
- **Real Payment Gateway**: Integration with actual payment providers

## 📞 Support

For technical support or questions:
- Email: support@autocare.com
- Phone: (555) 123-4567
- Hours: Monday-Friday, 9AM-6PM

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
