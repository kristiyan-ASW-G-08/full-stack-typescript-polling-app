import express from 'express';
import * as yup from 'yup';
import {
  signUp,
  logIn,
  editUserProfile,
  resetPassword,
  requestPasswordResetEmail,
  verifyEmail,
} from '@users/controllers';
import validationHandler from '@customMiddleware/validationHandler';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import Validators from '@poll/common/source/validators/Validators';
import pathValidators from '@poll/common/source/validators/pathValidators';

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

router.patch(
  '/users/user/reset',
  authenticationHandler,
  validationHandler([
    { schema: Validators.passwordResetValidator, target: 'body' },
  ]),
  resetPassword,
);
router.post(
  '/users/user/request/reset',
  validationHandler([
    { schema: Validators.requestPasswordResetValidator, target: 'body' },
  ]),
  requestPasswordResetEmail,
);
router.patch('/users/user/verify/:token', verifyEmail);
export default router;
