// backend/src/routes/financeIncomeRoutes.js
import express from "express";
<<<<<<< HEAD
import { upload } from "../middleware/multer.js";  // ✅ shared multer
=======
import multer from "multer";
>>>>>>> origin/Vinci

import {
  addFinanceIncome,
  getAllFinanceIncomes,
  getFinanceIncomeById,
  updateFinanceIncome,
  deleteFinanceIncome,
} from "../controllers/financeIncomeController.js";

const router = express.Router();

<<<<<<< HEAD
// Test route
=======
// ✅ Multer setup (store in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// ✅ Test route
>>>>>>> origin/Vinci
router.get("/test", (req, res) => {
  res.json({ message: "Finance Income route is working!" });
});

<<<<<<< HEAD
// Routes
=======
// ✅ Main routes
>>>>>>> origin/Vinci
router.post("/", upload.single("image"), addFinanceIncome);
router.get("/", getAllFinanceIncomes);
router.get("/:id", getFinanceIncomeById);
router.put("/:id", upload.single("image"), updateFinanceIncome);
router.delete("/:id", deleteFinanceIncome);

console.log("✅ financeIncomeRoutes file loaded");

export default router;
