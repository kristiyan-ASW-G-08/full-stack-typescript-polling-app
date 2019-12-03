import * as yup from 'yup';
import { email, password } from './pathValidators';

const loginValidator = yup.object().shape({
  email,
  password,
});

export default loginValidator;
