import * as yup from 'yup';

const signUpValidator = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(1)
    .max(50)
    .required(),
  location: yup
    .string()
    .trim()
    .min(1)
    .required(),
  email: yup
    .string()
    .trim()
    .email()
    .required(),
  password: yup
    .string()
    .trim()
    .min(12)
    .required(),
  confirmationPassword: yup
    .string()
    .trim()
    .min(12)
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export default signUpValidator;
