import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';
// import validate from '../middlewares/validate';
// import { signupSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/signup',validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;