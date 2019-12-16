import { Router } from 'express';
import Validators from '@poll/common/source/validators/Validators';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import validationHandler from '@customMiddleware/validationHandler';
import { postPoll, getPoll } from '@polls/controllers';

const router = Router();

router.post(
  '/polls',
  authenticationHandler,
  validationHandler([{ schema: Validators.pollValidator, target: 'body' }]),
  postPoll,
);

router.get('/polls/:pollId', getPoll);

export default router;
