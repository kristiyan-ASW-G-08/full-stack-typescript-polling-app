import * as yup from 'yup';

export const username = yup
  .string()
  .trim()
  .min(1)
  .max(50)
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

export const pollName = yup
  .string()
  .trim()
  .min(1)
  .max(200)
  .required();
export const description = yup
  .string()
  .trim()
  .min(1)
  .max(1000)
  .required();

export const optionName = yup
  .string()
  .trim()
  .min(1)
  .max(200)
  .required();
export const options = yup
  .array()
  .of(optionName)
  .min(2)
  .max(10)
  .required();


export const endDate = yup.date().required();
