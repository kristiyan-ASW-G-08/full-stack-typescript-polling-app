import * as yup from 'yup';
import { username } from './pathValidators';

const profileValidator = yup.object().shape({
  username,
});

export default profileValidator;
