import prisma from '../utils/prisma';

export const followUserServcie = async (targetUserId:string , followerId:string) =>{
    if( targetUserId === followerId){
        throw new Error('Cannot follow yourself');
    }
    const alreadyFollowing = await prisma.follows.findFirst({
        where:{
            followerId,
            followingId:targetUserId
        }

    })
    if(alreadyFollowing){
        throw new Error('You are already following this user');
    }
    await prisma.follows.create({
        data:{
            followerId,
            followingId:targetUserId
        }
    })
    return {message:'User followed successfully' };
}


export const unfollowUserServcie = async (targetUserId:string , followerId:string) =>{
    const followRelation = await prisma.follows.findFirst({
        where:{
            followerId,
            followingId:targetUserId
        }
    })
    if (!followRelation) {
        throw new Error('You are not following this user.');
    }

    await prisma.follows.delete({
        where:{
            id:followRelation.id
        }
    });
    return {message:'User unfollowed successfully' };

}
