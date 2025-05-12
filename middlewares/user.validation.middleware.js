import { ValidationError } from "../helpers/errors.js";
import { USER } from "../models/user.js";
import { validateEmail, validateNoExtraFields, validateNoIdFieldInBody, validatePassword, validatePhone, validateRequiredFields } from "./validators.js";
import { handleValidationError } from "./helpers.js";

const attributesValidators = {
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword
};

const noRedundantValidator = (model) => {
  return (body) => {
    // Separate "id" validation due specification
    validateNoIdFieldInBody(body);

    // According specification no extra data allowed and all field are required
    const allowedFields = Object.keys(model).filter(key => key !== "id");
    validateNoExtraFields(body, allowedFields);
  }
}

const attributesValidator = (validators) => {
  return (body) => {
    Object.entries(validators).forEach(([key, validator]) => {
      if (body[key] !== undefined) validator(body[key]);
    });
  }
}

const completeModelValidator = (model) => {
  return (body) => {
    // Completeness validation
    const requiredFields = Object.keys(model).filter(key => key !== "id");
    validateRequiredFields(body, requiredFields);
  }
}

const validateNotEmptyBody = (body) => {
  if (Object.keys(body).length === 0) {
    throw new ValidationError("The request body must include at least one valid field to update.")
  }
}

const validationChain = (validators) => {
  return (req, res, next) => {    
    try {
      validators.forEach((validator) => validator(req.body));    
      next();
    } catch (error) {
      handleValidationError(error, res);
    }
  }
}

const createUserValid = validationChain([
  noRedundantValidator(USER),
  completeModelValidator(USER),
  attributesValidator(attributesValidators)
]);

const updateUserValid = validationChain([
  noRedundantValidator(USER),
  validateNotEmptyBody,
  attributesValidator(attributesValidators)
]);

export { createUserValid, updateUserValid };
