import * as yup from 'yup';
import { password } from './pathValidators';

const profileValidator = yup.object().shape({
  password,
});

export default profileValidator;
