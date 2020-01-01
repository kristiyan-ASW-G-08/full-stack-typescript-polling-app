import * as yup from "yup";
import {
  pollName,
  description,
  endDate,
  optionName
} from "@poll/common/source/validators/pathValidators";

const pollValidator = yup.object().shape({
  name: pollName,
  description,
  options: yup
    .array()
    .of(
      yup.object().shape({
        value: optionName,
        id: yup.number()
      })
    )
    .min(2, "a poll must have at least 2 options")
    .max(4, "a poll must have a maximum of 4 options")
    .required(),
  endDate
});

export default pollValidator;
