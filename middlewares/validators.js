import { ValidationError } from "../helpers/errors.js";


const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/;
const PHONE_REGEX = /^\+380\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;


/* Data Entities validators */

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

const validateNumberAttributeInRange = (field, value, min, max) => {
  if (typeof value !== "number" || !(value >= min && value <= max)) {
    throw new ValidationError(`${field} must be a number between ${min} and ${max}`);
  }
};


/* Consistency validators */

const validateNoIdFieldInBody = (body) => {
  if (body.id) {
    throw new ValidationError("ID is not allowed");
  }
}

const validateNoExtraFields = (body, allowedFields) => {
  const allowedFieldsSet = new Set(allowedFields);
  const extraFields = Object.keys(body).filter(field => !allowedFieldsSet.has(field));
  if (extraFields.length > 0) {
    throw new ValidationError(`Unexpected fields '${extraFields.join("', '")}'`);
  }
}

const validateRequiredFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter(field => body[field] === undefined);
  if (missingFields.length > 0) {
    throw new ValidationError(`Required fields '${missingFields.join("', '")}' are missing`);
  }
}

const validateNotEmptyBody = (body) => {
  if (Object.keys(body).length === 0) {
    throw new ValidationError("The request body must include at least one valid field to update.")
  }
}


/* Validation factories */

const noRedundantValidator = (model) => {
  return (body) => {
    // Separate "id" validation due specification
    validateNoIdFieldInBody(body);

    // According specification no extra data allowed and all field are required
    const allowedFields = Object.keys(model).filter(key => key !== "id");
    validateNoExtraFields(body, allowedFields);
  }
}

const completeModelValidator = (model) => {
  return (body) => {
    // Completeness validation
    const requiredFields = Object.keys(model).filter(key => key !== "id");
    validateRequiredFields(body, requiredFields);
  }
}

const attributesValidator = (validators) => {
  return (body) => {
    Object.entries(validators).forEach(([key, validator]) => {
      if (body[key] !== undefined) validator(body[key]);
    });
  }
}

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
  }
}

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