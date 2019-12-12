import { Router } from 'express';
import Validators from '@poll/common/source/validators/Validators';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import validationHandler from '@customMiddleware/validationHandler';
import { postPoll } from '@polls/controllers';

const router = Router();

router.post(
  '/polls',
  authenticationHandler,
  validationHandler([{ schema: Validators.pollValidator, target: 'body' }]),
  postPoll,
);

export default router;
