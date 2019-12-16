import * as yup from 'yup';

const sortStringValidator = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .min(1)
    .max(50),
  page: yup
    .number()
    .min(1)
    .integer(),
});

export default sortStringValidator;
