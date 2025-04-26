import { Router } from 'express';
import auth from '../middlewares/auth';
import { followUser, unfollowUSer } from '../controllers/follow.controller';
import validate from '../middlewares/validate';
import { followSchema } from '../schemas/follow.schema';

const router = Router();

router.post('/:id/follow', auth,validate(followSchema), followUser);
router.post('/:id/unfollow', auth,validate(followSchema), unfollowUSer);

export default router;
