import * as yup from 'yup';
import { email } from './pathValidators';

const profileValidator = yup.object().shape({
  email,
});

export default profileValidator;
