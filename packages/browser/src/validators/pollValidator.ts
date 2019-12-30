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
  option: yup
    .array()
    .of(
      yup.object().shape({
        value: optionName,
        id: yup.number()
      })
    )
    .min(2)
    .max(10)
    .required(),
  endDate
});

export default pollValidator;
