import { ValidationError } from "../helpers/errors.js";

/* Regular Expressions */
const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/;
const PHONE_REGEX = /^\+380\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;

/* Data Entities Validators */

/**
 * Validates that an email address is a Gmail account.
 * 
 * @param {string} email - The email address to validate.
 * @throws {ValidationError} If the email is not a valid Gmail address.
 */
const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("Email must be a valid gmail address");
  }
};

/**
 * Validates that a phone number matches the Ukrainian format (+380XXXXXXXXX).
 * 
 * @param {string} phone - The phone number to validate.
 * @throws {ValidationError} If the phone number format is invalid.
 */
const validatePhone = (phone) => {
  if (!PHONE_REGEX.test(phone)) {
    throw new ValidationError("Invalid phone number format");
  }
};

/**
 * Validates that a password meets complexity requirements.
 * 
 * @param {string} password - The password to validate.
 * @throws {ValidationError} If the password does not meet the requirements.
 */
const validatePassword = (password) => {
  if (typeof password !== "string" || password.length < 4) {
    throw new ValidationError("Password must be a string with a minimum length of 4 characters.");
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ValidationError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  }
};

/**
 * Validates that a numeric attribute is within a specified range.
 * 
 * @param {string} field - The name of the field being validated.
 * @param {number} value - The value to validate.
 * @param {number} min - The minimum allowed value.
 * @param {number} max - The maximum allowed value.
 * @throws {ValidationError} If the value is not within the specified range.
 */
const validateNumberAttributeInRange = (field, value, min, max) => {
  if (typeof value !== "number" || !(value >= min && value <= max)) {
    throw new ValidationError(`${field} must be a number between ${min} and ${max}`);
  }
};

/* Consistency Validators */

/**
 * Validates that the request body does not contain an "id" field.
 * 
 * @param {Object} body - The request body to validate.
 * @throws {ValidationError} If the "id" field is present.
 */
const validateNoIdFieldInBody = (body) => {
  if (body.id) {
    throw new ValidationError("ID is not allowed");
  }
};

/**
 * Validates that the request body does not contain fields outside the allowed list.
 * 
 * @param {Object} body - The request body to validate.
 * @param {string[]} allowedFields - The list of allowed field names.
 * @throws {ValidationError} If extra fields are present.
 */
const validateNoExtraFields = (body, allowedFields) => {
  const allowedFieldsSet = new Set(allowedFields);
  const extraFields = Object.keys(body).filter(field => !allowedFieldsSet.has(field));
  if (extraFields.length > 0) {
    throw new ValidationError(`Unexpected fields '${extraFields.join("', '")}'`);
  }
};

/**
 * Validates that the request body contains all required fields.
 * 
 * @param {Object} body - The request body to validate.
 * @param {string[]} requiredFields - The list of required field names.
 * @throws {ValidationError} If required fields are missing.
 */
const validateRequiredFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter(field => body[field] === undefined);
  if (missingFields.length > 0) {
    throw new ValidationError(`Required fields '${missingFields.join("', '")}' are missing`);
  }
};

/**
 * Validates that the request body is not empty.
 * 
 * @param {Object} body - The request body to validate.
 * @throws {ValidationError} If the body is empty.
 */
const validateNotEmptyBody = (body) => {
  if (Object.keys(body).length === 0) {
    throw new ValidationError("The request body must include at least one valid field to update.");
  }
};

/* Validation Factories */

/**
 * Creates a validator that ensures no redundant fields are present in the request body.
 * 
 * @param {Object|Array<string>} model - The model defining allowed fields (as an object or a list of field names).
 * @returns {Function} A validator function.
 */
const noRedundantValidator = (model) => {
  return (body) => {
    // Separate "id" validation due specification
    validateNoIdFieldInBody(body);

    // According specification no extra data allowed and all field are required
    const allowedFields = Array.isArray(model)
      ? model
      : Object.keys(model).filter(key => key !== "id");
      
    validateNoExtraFields(body, allowedFields);
  };
};

/**
 * Creates a validator that ensures all required fields are present in the request body.
 * 
 * @param {Object} model - The model defining required fields.
 * @returns {Function} A validator function.
 */
const completeModelValidator = (model) => {
  return (body) => {
    // Completeness validation
    const requiredFields = Object.keys(model).filter(key => key !== "id");
    validateRequiredFields(body, requiredFields);
  };
};

/**
 * Creates a validator that validates specific attributes in the request body.
 * 
 * @param {Object} validators - An object mapping field names to their respective validators.
 * @returns {Function} A validator function.
 */
const attributesValidator = (validators) => {
  return (body) => {
    Object.entries(validators).forEach(([key, validator]) => {
      if (body[key] !== undefined) validator(body[key]);
    });
  };
};

/**
 * Creates a middleware chain for running sequence of validators.
 * 
 * @param {Function[]} validators - An array of validator functions.
 * @returns {Function} A middleware function.
 */
const validationChain = (validators) => {
  return (req, res, next) => {
    try {
      validators.forEach((validator) => validator(req.body));
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        next(error);
      } else {
        throw error; // We only care about validation errors. Let someone else take care of the other errors.
      }
    }
  };
};

export {
  noRedundantValidator,
  attributesValidator,
  completeModelValidator,
  validateNotEmptyBody,
  validationChain,
  validateNoIdFieldInBody,
  validateRequiredFields,
  validateNoExtraFields,
  validateEmail,
  validatePhone,
  validatePassword,
  validateNumberAttributeInRange
};