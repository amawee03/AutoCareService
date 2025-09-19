import express from "express"
import { getAllPackages, createPackage, updatePackage, deletePackage, getPackageById } from "../controllers/catalogueController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({ storage });

router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.post("/", upload.single("image"), createPackage);
router.put("/:id", upload.single("image"), updatePackage);
router.delete("/:id", deletePackage);

export default router;

