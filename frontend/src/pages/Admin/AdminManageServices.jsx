// catalogueRoutes.js
import express from "express";
import ServicePackage from "../models/ServicePackage.js"; // Make sure this import exists
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await ServicePackage.find();
    res.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages", error: error.message });
  }
});

// GET single package by ID
router.get("/:id", async (req, res) => {
  try {
    const sPackage = await ServicePackage.findById(req.params.id);
    if (!sPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(sPackage);
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Failed to fetch package", error: error.message });
  }
});

// POST create new package
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { pkgName, description, price, duration, category, status } = req.body;
    
    const packageData = {
      pkgName,
      description,
      price: Number(price),
      duration: Number(duration),
      category: category || "General",
      status: status || "active",
    };

    if (req.file) {
      packageData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const newPackage = new ServicePackage(packageData);
    const savedPackage = await newPackage.save();
    
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Failed to create package", error: error.message });
  }
});

// PUT update package
router.put("/:id", async (req, res) => {
  try {
    const { pkgName, description, price, duration, status } = req.body;
    
    const updateData = {
      pkgName,
      description,
      price: Number(price),
      duration: Number(duration),
      status,
    };

    const updatedPackage = await ServicePackage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ message: "Failed to update package", error: error.message });
  }
});

// DELETE package
router.delete("/:id", async (req, res) => {
  try {
    const packageId = req.params.id;
    
    // Find the package first to get image path
    const sPackage = await ServicePackage.findById(packageId);
    if (!sPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Delete the package from database
    await ServicePackage.findByIdAndDelete(packageId);

    // Try to delete associated image file (if exists)
    if (sPackage.imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), sPackage.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (imageError) {
        console.warn("Failed to delete image file:", imageError.message);
        // Don't fail the entire operation if image deletion fails
      }
    }

    res.json({ message: "Package deleted successfully", deletedPackage: package });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Failed to delete package", error: error.message });
  }
});

export default router;