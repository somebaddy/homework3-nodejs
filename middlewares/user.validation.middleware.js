import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // Separate "id" validation due specification
  if (req.body.id) {
    res.status(400).json({ error: true, message: "ID is not allowed" });
    return;
  }

  // Due specification no extra data allowed and all field are required
  const allowedFields = Object.keys(USER).filter(key => key !== "id");
  const requiredFields = allowedFields;

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(400).json({
      error: true,
      message: `Required fields '${missingFields.join("', '")}' are missing`,
    });
    return;
  }

  const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

  if (extraFields.length > 0) {
    res.status(400).json({
      error: true,
      message: `Unexpected fields: ${extraFields.join(", ")}`,
    });
    return;
  }

  const emailRegex = /^[^\s@]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: true,
      message: "Email must be a valid gmail address"
    });
    return;
  }

  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(phone)) {
    res.status(400).json({
      error: true,
      message: "Invalid phone number format"
    });
    return;
  }

  if (typeof password !== "string" || password.length < 4) {
    res.status(400).json({
      error: true,
      message: "Password must be a string at least 4 characters long"
    });
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      error: true,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    });
    return;
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // Separate "id" validation due specification
  if (req.body.id) {
    res.status(400).json({
      error: true,
      message: "ID is not allowed"
    });
    return;
  }

  const allowedFields = Object.keys(USER);
  const providedFields = Object.keys(req.body);

  if (providedFields.some(field => !allowedFields.includes(field))) {
    return res.status(400).json({
      error: true,
      message: "Request body contains fields not present in the user model.",
    });
  }

  if (providedFields.length === 0) {
    return res.status(400).json({
      error: true,
      message: "Request body must contain at least one field from the user model.",
    });
  }

  next();
};

export { createUserValid, updateUserValid };
