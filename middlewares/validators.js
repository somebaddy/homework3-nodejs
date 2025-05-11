import { ValidationError } from "../helpers/errors.js";


const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/;
const PHONE_REGEX = /^\+380\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;

const validateNoIdFieldInBody = (body) => {
  if (body.id) {
    throw new ValidationError("ID is not allowed");
  }
}

const validateRequiredFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter(field => body[field] === undefined);
  if (missingFields.length > 0) {
    throw new ValidationError(`Required fields '${missingFields.join("', '")}' are missing`);
  }
}

const validateNoExtraFields = (body, allowedFields) => {
  const extraFields = Object.keys(body).filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    throw new ValidationError(`Unexpected fields '${extraFields.join("', '")}'`);
  }
}

const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError("Email must be a valid gmail address");
  }
}

const validatePhone = (phone) => {
  if (!PHONE_REGEX.test(phone)) {
    throw new ValidationError("Invalid phone number format");
  }
}

const validatePassword = (password) => {
  if (typeof password !== "string" || password.length < 4) {
    throw new ValidationError("Password must be a string with a minimum length of 4 characters.");
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ValidationError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
  }
}

export {
  validateNoIdFieldInBody,
  validateRequiredFields,
  validateNoExtraFields,
  validateEmail,
  validatePhone,
  validatePassword
};