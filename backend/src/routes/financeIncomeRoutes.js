import express from "express";
import {
  addFinanceIncome,
  getAllFinanceIncomes,
  getFinanceIncomeById,
  updateFinanceIncome,
  deleteFinanceIncome
} from "../controllers/financeIncomeController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Finance Income route is working!" });
});



router.post("/", addFinanceIncome);


router.get("/", getAllFinanceIncomes);


router.get("/:id", getFinanceIncomeById);


router.put("/:id", updateFinanceIncome);


router.delete("/:id", deleteFinanceIncome);

console.log("✅ financeIncomeRoutes file loaded");



export default router;
