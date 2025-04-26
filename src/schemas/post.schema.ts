import {z} from 'zod';

export const postSchema = z.object({
    content: z.string().min(1,'Post Content is required')
});

export const commentSchema = z.object({
    content: z.string().min(1,'Comment Content is required')
});
