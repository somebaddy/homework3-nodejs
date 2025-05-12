import { FIGHTER } from "../models/fighter.js";
import { 
  attributesValidator, 
  noRedundantValidator, 
  validateNotEmptyBody, 
  validateNumberAttributeInRange, 
  validateRequiredFields, 
  validationChain
} from "./validators.js";

const attributesValidators = {
  power: (power) => validateNumberAttributeInRange("Power", power, 1, 100),
  defense: (defense) => validateNumberAttributeInRange("Defense", defense, 1, 10),
  health: (health) => validateNumberAttributeInRange("Health", health, 80, 120),
};

const createFighterValid = validationChain([
  // Ensure no extra fields and "id" is not included
  noRedundantValidator(FIGHTER),
  // Ensure required fields are present
  (body) => validateRequiredFields(body, ["name", "power", "defense"]),
  // Validate specific attributes (power, defense, health)
  attributesValidator(attributesValidators)
]);

const updateFighterValid = validationChain([
  // Ensure no extra fields and "id" is not included
  noRedundantValidator(FIGHTER),
  // Ensure that request body contains at least one field
  validateNotEmptyBody,
  // Validate specific attributes (power, defense, health)
  attributesValidator(attributesValidators)
]);

export { createFighterValid, updateFighterValid };
