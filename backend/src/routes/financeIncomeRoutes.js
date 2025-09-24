import express from "express";
import multer from "multer";

import {
  addFinanceIncome,
  getAllFinanceIncomes,
  getFinanceIncomeById,
  updateFinanceIncome,
  deleteFinanceIncome,
} from "../controllers/financeIncomeController.js";

const router = express.Router();

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
router.get("/test", (req, res) => {
  res.json({ message: "Finance Income route is working!" });
});

// ✅ Main routes
router.post("/", upload.single("image"), addFinanceIncome);
router.get("/", getAllFinanceIncomes);
router.get("/:id", getFinanceIncomeById);
router.put("/:id", upload.single("image"), updateFinanceIncome);
router.delete("/:id", deleteFinanceIncome);

console.log("✅ financeIncomeRoutes file loaded");

export default router;
