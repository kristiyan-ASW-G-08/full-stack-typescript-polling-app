import * as yup from "yup";

const voteValidator = yup.object().shape({
  option: yup
    .string()
    .required()
    .min(1)
});

export default voteValidator;
