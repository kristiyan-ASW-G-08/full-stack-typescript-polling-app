import * as yup from 'yup';

const voteValidator = yup.object().shape({
  latitude: yup
    .string()
    .trim()
    .min(1)
    .required(),
  longitude: yup
    .string()
    .trim()
    .min(1)
    .required(),
});

export default voteValidator;
