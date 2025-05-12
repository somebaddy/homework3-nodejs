import { ValidationError } from "../helpers/errors.js";
import { USER } from "../models/user.js";
import { validateEmail, validateNoExtraFields, validateNoIdFieldInBody, validatePassword, validatePhone, validateRequiredFields } from "./validators.js";
import { handleValidationError } from "./helpers.js";

const attributesValidators = {
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword
};

const validateRedundantFields = (body, model) => {
  // Separate "id" validation due specification
  validateNoIdFieldInBody(body);

  // According specification no extra data allowed and all field are required
  const allowedFields = Object.keys(model).filter(key => key !== "id");
  validateNoExtraFields(body, allowedFields);
}

const validateUserAttibutes = (body, validators) => {
  Object.entries(validators).forEach(([key, validator]) => {
    if (body[key] !== undefined) validator(body[key]);
  });
}

const validateCompleteModel = (body, model) => {
  // Completeness validation
  const requiredFields = Object.keys(model).filter(key => key !== "id");
  validateRequiredFields(body, requiredFields);
}

const validateNotEmptyBody = (body) => {
  if (Object.keys(body).length === 0) {
    throw new ValidationError("The request body must include at least one valid field to update.")
  }
}

const createUserValid = (req, res, next) => {
  try {
    validateRedundantFields(req.body, USER);
    validateCompleteModel(req.body, USER);
    validateUserAttibutes(req.body, attributesValidators);

    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};

const updateUserValid = (req, res, next) => {
  try {
    validateRedundantFields(req.body, USER);
    validateNotEmptyBody(req.body);
    validateUserAttibutes(req.body, attributesValidators);

    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};

export { createUserValid, updateUserValid };
