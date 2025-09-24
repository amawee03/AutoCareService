// backend/src/routes/financeIncomeRoutes.js
import express from "express";
import { upload } from "../middleware/multer.js";  // ✅ shared multer

import {
  addFinanceIncome,
  getAllFinanceIncomes,
  getFinanceIncomeById,
  updateFinanceIncome,
  deleteFinanceIncome,
} from "../controllers/financeIncomeController.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Finance Income route is working!" });
});

// Routes
router.post("/", upload.single("image"), addFinanceIncome);
router.get("/", getAllFinanceIncomes);
router.get("/:id", getFinanceIncomeById);
router.put("/:id", upload.single("image"), updateFinanceIncome);
router.delete("/:id", deleteFinanceIncome);

console.log("✅ financeIncomeRoutes file loaded");

export default router;
