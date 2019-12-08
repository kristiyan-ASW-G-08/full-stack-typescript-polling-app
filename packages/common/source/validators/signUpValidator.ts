import * as yup from 'yup';
import { username, email, password } from './pathValidators';

const signUpValidator = yup.object().shape({
  username,
  email,
  password,
  confirmationPassword: yup
    .string()
    .trim()
    .min(12)
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export default signUpValidator;
