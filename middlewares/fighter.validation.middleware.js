import { FIGHTER } from "../models/fighter.js";
import { handleValidationError } from "./helpers.js";
import { ValidationError } from "../helpers/errors.js";
import { validateNoExtraFields, validateNoIdFieldInBody, validateRequiredFields } from "./validators.js";

const validatePower = (power) => {
  if (typeof power !== 'number' || !(power >= 1 && power <= 100)) {
    throw new ValidationError("Power must be a number between 1 and 100");
  }
};

const validateDefense = (defense) => {
  if (typeof defense !== 'number' || !(defense >=1 && defense <= 10)) {
    throw new ValidationError("Defense must be a number between 1 and 10");
  }
};

const validateHealth = (health) => {
  if (typeof health !== 'number' || !(health >= 80 && health <= 120)) {
    throw new ValidationError("Health must be a number between 80 and 120");
  }
};


const createFighterValid = (req, res, next) => {
  try {
    const { name, power, defense, health = 85 } = req.body;

    // Separate "id" validation due specification
    validateNoIdFieldInBody(req.body);

    const allowedFields = Object.keys(FIGHTER);
    validateNoExtraFields(req.body, allowedFields);

    const requiredFields = ["name", "power", "defense"];
    validateRequiredFields(req.body, requiredFields);

    validateHealth(health);
    validatePower(power);
    validateDefense(defense);

    next();
  } catch (error) {
    handleValidationError(error, res);
  }
};

const updateFighterValid = (req, res, next) => {
  try {
    validateNoIdFieldInBody(req.body);

    const allowedFields = Object.keys(FIGHTER);
    validateNoExtraFields(req.body, allowedFields);

    const providedFields = Object.keys(req.body);
    if (providedFields.length === 0) {
      throw new ValidationError("The request body must include at least one valid field to update.")
    }

    if (req.body.power) validatePower(req.body.power);
    if (req.body.defense) validateDefense(req.body.defense);
    if (req.body.health) validateHealth(req.body.health);

    next(); 
  } catch (error) {
    handleValidationError(error, res);
  }
};

export { createFighterValid, updateFighterValid };
