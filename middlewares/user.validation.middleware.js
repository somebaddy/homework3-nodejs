import { USER } from "../models/user.js";
import { 
  attributesValidator, 
  completeModelValidator, 
  noRedundantValidator, 
  validateEmail, 
  validateNotEmptyBody, 
  validatePassword, 
  validatePhone, 
  validationChain 
} from "./validators.js";

const attributesValidators = {
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword
};

const createUserValid = validationChain([
  // Ensure no extra fields and "id" is not included
  noRedundantValidator(USER),
  // Ensure all model fields are present
  completeModelValidator(USER),
  // Validate specific attributes (email, phone, password)
  attributesValidator(attributesValidators)
]);

const updateUserValid = validationChain([
  // Ensure no extra fields and "id" is not included
  noRedundantValidator(USER),
  // Ensure that request body contains at least one field
  validateNotEmptyBody,
  // Validate specific attributes (email, phone, password)
  attributesValidator(attributesValidators)
]);

export { createUserValid, updateUserValid };
