import express from 'express';
import { signUp, logIn } from '@users/controllers';
import validationHandler from '@customMiddleware/validationHandler';
import Validators from '@metp/common/source/validators/Validators';

const router = express.Router();

router.post(
  '/users',
  validationHandler([{ schema: Validators.signUpValidator, target: 'body' }]),
  signUp,
);

router.post(
  '/users/user/login',
  validationHandler([{ schema: Validators.loginValidator, target: 'body' }]),
  logIn,
);

export default router;
