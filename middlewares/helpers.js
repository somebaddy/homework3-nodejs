import { ValidationError } from "../helpers/errors.js";

const setResponseError = (res, err) => {
  let { message, code } = err;
  code = code || 500;
  message = message || "Unknown error. That's embarrassing."
  res.status(code).json({
    error: true,
    message
  })
}

const handleValidationError = (error, res) => {
  if (error instanceof ValidationError) {
    setResponseError(res, error);
  } else {
    throw error;
  }
}

export { handleValidationError, setResponseError };