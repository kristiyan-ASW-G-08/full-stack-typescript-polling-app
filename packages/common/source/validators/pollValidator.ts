import * as yup from 'yup';
import { pollName, description, options, endDate } from './pathValidators';

const pollValidator = yup.object().shape({
  name: pollName,
  description,
  options,
  endDate,
});

export default pollValidator;
