import { ValidationError } from "../helpers/errors.js";
import { USER } from "../models/user.js";
import { validateEmail, validateNoExtraFields, validateNoIdFieldInBody, validatePassword, validatePhone, validateRequiredFields } from "./validators.js";
import { handleValidationError } from "./helpers.js";


const createUserValid = (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Separate "id" validation due specification
    validateNoIdFieldInBody(req.body);

    // Due specification no extra data allowed and all field are required
    const allowedFields = Object.keys(USER).filter(key => key !== "id");
    const requiredFields = allowedFields;

    // Completeness validation
    validateRequiredFields(req.body, requiredFields);
    validateNoExtraFields(req.body, allowedFields);

    // Attributes validation
    validateEmail(email);
    validatePhone(phone);
    validatePassword(password);

    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};

const updateUserValid = (req, res, next) => {
  try {
    validateNoIdFieldInBody(req.body);

    const allowedFields = Object.keys(USER).filter(key => key !== "id");
    validateNoExtraFields(req.body, allowedFields);

    const providedFields = Object.keys(req.body);
    if (providedFields.length === 0) {
      throw new ValidationError("The request body must include at least one valid field to update.")
    }

    if (req.body.email) validateEmail(req.body.email);
    if (req.body.phone) validatePhone(req.body.phone);
    if (req.body.password) validatePassword(req.body.password);

    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};

export { createUserValid, updateUserValid };
