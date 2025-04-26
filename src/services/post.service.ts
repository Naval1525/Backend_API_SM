import prisma from "../utils/prisma";

export const createPostService = async (
  data: { content: string },
  userId: string
) => {
  return await prisma.post.create({
    data: {
      content: data.content,
      authorId: userId,
    },
  });
};

export const likePostService = async (postId: string, userId: string) => {
  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });
  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    return { message: "Post unliked" };
  }
  await prisma.like.create({
    data: {
      postId,
      userId,
    },
  });
  return { message: "Post liked" };
};

export const commentPostService = async (
  postId: string,
  userId: string,
  data: { text: string }
) => {
  return await prisma.comment.create({
    data: {
      content: data.text,
      postId,
      authorId: userId,
    }
  });
};