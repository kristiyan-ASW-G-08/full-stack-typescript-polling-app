import { Router } from 'express';
import { postVote } from '@votes/controllers';
import authenticationHandler from '@customMiddleware/authenticationHandler';

const router = Router();

router.post(
  '/polls/:pollId/options/:optionId/votes',
  authenticationHandler,
  postVote,
);

export default router;
