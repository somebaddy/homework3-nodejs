import { ValidationError } from "../helpers/errors.js";

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

export { handleValidationError };