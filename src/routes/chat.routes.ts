import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/chat.controller';
import auth from '../middlewares/auth';

const router = Router();

// Route to send a message
router.post('/send', auth, sendMessage);

// Route to get messages between users
router.get('/:id/messages', auth, getMessages);

export default router;
