import FinanceIncome from "../models/FinanceIncomeModel.js";

// ✅ Create a new finance income
export const addFinanceIncome = async (req, res) => {
  try {
    const { dateReceived, amount, category, mode, name, description } = req.body;

    const newIncome = new FinanceIncome({
      dateReceived,
      amount,
      category,
      mode,
      name,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null, // save path if file uploaded
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all finance incomes
export const getAllFinanceIncomes = async (req, res) => {
  try {
    const incomes = await FinanceIncome.find();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single finance income by ID
export const getFinanceIncomeById = async (req, res) => {
  try {
    const income = await FinanceIncome.findById(req.params.id);
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a finance income by ID
export const updateFinanceIncome = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedIncome = await FinanceIncome.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedIncome) return res.status(404).json({ message: "Income not found" });
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete a finance income by ID
export const deleteFinanceIncome = async (req, res) => {
  try {
    const deletedIncome = await FinanceIncome.findByIdAndDelete(req.params.id);
    if (!deletedIncome) return res.status(404).json({ message: "Income not found" });
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
