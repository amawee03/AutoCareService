import mongoose from "mongoose";

// Define the schema
const financeIncomeSchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ["cash", "card", "bankTransfer", "other"], // optional, but good practice
    default: "cash"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "" // optional field, defaults to empty string
  }
});

// Create the model
const FinanceIncome = mongoose.model("financeIncome", financeIncomeSchema);

export default FinanceIncome;
