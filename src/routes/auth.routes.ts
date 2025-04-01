import express from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { authValidation } from '../validations/auth.validation';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

export default router;
