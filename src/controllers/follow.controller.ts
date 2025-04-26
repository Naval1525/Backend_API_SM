import { Request, Response } from 'express';
import { followUserServcie, unfollowUserServcie } from '../services/follow.service';

export const followUser = async (req:Request , res:Response) => {
    try{
        const result = await followUserServcie(req.params.id, req.user.id);
        res.status(201).json(result);

    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const unfollowUSer = async (req:Request , res:Response)=>{
    try{
        const result = await unfollowUserServcie(req.params.id, req.user.id);
        res.status(201).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}









