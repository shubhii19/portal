import express from "express";
import {
  getCompanyByIdController,
  getCompanyController,
  registerCompanyController,
  updateCompanyController,
} from "../controllers/companyController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.post("/register", isAuthenticated, registerCompanyController);
router.get("/get", isAuthenticated, getCompanyController);
router.get("/get/:id", isAuthenticated, getCompanyByIdController);
router.put("/update/:id", isAuthenticated,singleUpload, updateCompanyController);

export default router;
