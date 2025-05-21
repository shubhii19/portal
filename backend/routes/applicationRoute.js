import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJobController, getApplicantsController, getAppliedJobsController, updateStatusController } from "../controllers/applicationController.js";
const router = express.Router();


router.get("/apply/:id",isAuthenticated,applyJobController);
router.get("/get",isAuthenticated,getAppliedJobsController);
router.get("/:id/applicants",isAuthenticated,getApplicantsController);
router.post("/status/:id/update",isAuthenticated,updateStatusController);

export default router;