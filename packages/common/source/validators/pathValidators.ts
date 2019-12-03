import * as yup from 'yup';

export const username = yup
  .string()
  .trim()
  .min(1)
  .max(50)
  .required();
export const bio = yup
  .string()
  .trim()
  .max(400);
export const location = yup
  .string()
  .trim()
  .min(1)
  .required();
export const email = yup
  .string()
  .trim()
  .email()
  .required();
export const password = yup
  .string()
  .trim()
  .min(12)
  .required();
