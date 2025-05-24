import express from 'express';
import { loginController, logoutController, registerController, updateProfileController } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
const router = express.Router();

router.post('/register',singleUpload,registerController);
router.post('/login',loginController);
router.post('/profile/update',isAuthenticated,updateProfileController);
router.get('/logout',logoutController)


export default router;