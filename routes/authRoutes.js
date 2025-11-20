import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser
} from '../controllers/authController.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { registerUserSchema, loginUserSchema } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validateRequest(registerUserSchema), registerUser);
router.post('/login', validateRequest(loginUserSchema), loginUser);
router.post('/logout', logoutUser);

export default router;