import { Request, Response } from 'express';
import { sendMessageService, getMessagesService } from '../services/chat.service';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    // Store the message in the database
    const message = await sendMessageService(senderId, receiverId, content);

    res.status(200).json(message);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const messages = await getMessagesService(senderId, receiverId);
    res.status(200).json(messages);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
