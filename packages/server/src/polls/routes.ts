import { Router } from 'express';
import Validators from '@poll/common/source/validators/Validators';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import validationHandler from '@customMiddleware/validationHandler';
import paginationHandler from '@customMiddleware/paginationHandler';
import { postPoll, getPoll, getPolls } from '@polls/controllers';

const router = Router();

router.post(
  '/polls',
  authenticationHandler,
  validationHandler([{ schema: Validators.pollValidator, target: 'body' }]),
  postPoll,
);

router.get('/polls/:pollId', getPoll);

router.get(
  '/polls',
  validationHandler([{ schema: Validators.sortValidator, target: 'query' }]),
  paginationHandler,
  getPolls,
);

export default router;
