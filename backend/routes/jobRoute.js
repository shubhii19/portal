import express from 'express';
import {  getAdminJobsController, getAllJobsController, getjobByIdController, postJobController } from '../controllers/jobController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.post("/post",isAuthenticated,postJobController); 
router.get("/get",isAuthenticated,getAllJobsController);
router.get("/getadminjobs",isAuthenticated,getAdminJobsController);
router.get("/get/:id",isAuthenticated,getjobByIdController)


export default router;