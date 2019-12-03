import * as yup from 'yup';
import { username, location, bio } from './pathValidators';
const profileValidator = yup.object().shape({
  username,
  location,
  bio,
});

export default profileValidator;
