import { Router } from 'express';
import { postVote } from '@votes/controllers';
import validationHandler from '@customMiddleware/validationHandler';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import Validators from '@poll/common/source/validators/Validators';

const router = Router();

router.post(
  '/polls/:pollId/options/:optionId/votes',
  authenticationHandler,
  validationHandler([{ schema: Validators.voteValidator, target: 'body' }]),
  postVote,
);

export default router;
