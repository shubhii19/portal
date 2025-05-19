import express from 'express';
import { loginController, logoutController, registerController, updateProfileController } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.post('/profile/update',isAuthenticated,updateProfileController);
router.get('/logout',logoutController)


export default router;