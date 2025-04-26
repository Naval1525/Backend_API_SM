import prisma from '../utils/prisma';

export const sendMessageService = async (senderId: string, receiverId: string, content: string) => {
  // Save the message to the database
  const message = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });

  return message;
};

export const getMessagesService = async (senderId: string, receiverId: string) => {
  // Retrieve all messages between sender and receiver
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    orderBy: { createdAt: 'asc' }, // Order messages by creation time
  });

  return messages;
};
