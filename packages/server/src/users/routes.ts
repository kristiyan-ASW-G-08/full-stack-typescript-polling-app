import express from 'express';
import { signUp, logIn, editUserProfile } from '@users/controllers';
import validationHandler from '@customMiddleware/validationHandler';
import authenticationHandler from '@customMiddleware/authenticationHandler';
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

router.patch(
  '/users/user',
  authenticationHandler,
  validationHandler([{ schema: Validators.profileValidator, target: 'body' }]),
  editUserProfile,
);

export default router;
