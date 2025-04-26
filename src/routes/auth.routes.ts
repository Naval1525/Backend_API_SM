import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';
import { loginSchema, signupSchema } from '../schemas/auth.schema';
import validate from '../middlewares/validate';



const router = Router();

router.post('/signup',validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;