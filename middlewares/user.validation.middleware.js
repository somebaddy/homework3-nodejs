import { ValidationError } from "../helpers/errors.js";
import { USER } from "../models/user.js";

const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/;
const PHONE_REGEX = /^\+380\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;

const validateNoIdFieldInBody = (body) => {
  if (body.id) {
    throw new ValidationError("ID is not allowed");
  }
}

const validateRequiredFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter(field => !body[field]);
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


const handleValidationError = (error, res) => {
  if (error instanceof ValidationError) {
    const { message, code } = error;
    res.status(code).json({
      error: true,
      message
    })
    return;
  } else {
    throw error;
  }
}

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
