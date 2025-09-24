import express from "express";
import cors from "cors";
import catalogueRoutes from "./routes/catalogueRoutes.js";
import financeIncomeRoutes from "./routes/financeIncomeRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import path from "path";
import { fileURLToPath } from "url";
import archiveRoutes from "./routes/archiveRoutes.js";
import upload from "./middleware/multer.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.options("*", cors());
app.use("/uploads", express.static("uploads"));

// Routes with rate limiter applied where needed
app.use("/api/packages", ratelimiter, catalogueRoutes);
app.use("/api/appointments", ratelimiter, appointmentRoutes);
<<<<<<< HEAD
app.use("/api/admin", ratelimiter, adminRoutes);
=======
// app.use("/api/payments",paymentRoutes);
// app.use("/api/admin", ratelimiter, adminRoutes);
app.use("/api/finance-income", financeIncomeRoutes);
>>>>>>> origin/Vinci

// Serve uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

<<<<<<< HEAD
// app.use((req,res, next) => {
//     console.log(`New Package Request ${req.method} received & URI is ${req.url}`);
//     next();
// });

// Mounted once above with rate limiter

app.use("/api/finance-income", financeIncomeRoutes);
app.use("/api/finance-archives", archiveRoutes);



connectDB().then(()=>{
  app.listen(PORT,() =>{
    console.log("Server started on PORT: ",PORT);
  });
});



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(process.cwd(), 'uploads')); // folder must exist
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // unique file name
//   }
// });

// export const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file
  });
=======
// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});

// Global error handler (include after routes)
app.use((err, req, res, next) => {
  if (!err) return next();
  if (err.name === 'MulterError') return res.status(400).json({ message: err.message });
  return res.status(500).json({ message: err.message || 'Server error' });
>>>>>>> origin/Vinci
});
