import { Request, Response } from "express";
import { commentPostService, createPostService, likePostService } from "../services/post.service";



export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await createPostService(req.body, req.user.id);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const result = await likePostService(req.params.id, req.user.id);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const commentPost = async (req: Request, res: Response) => {
    try {
        // Added await and fixed parameter order to match service implementation
        const comment = await commentPostService(req.params.id, req.user.id, { text: req.body.content });
        res.status(201).json(comment);
    }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}