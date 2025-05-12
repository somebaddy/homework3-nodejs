import { ValidationError } from "../helpers/errors.js";
import { FIGHT } from "../models/fight.js";
import { 
    noRedundantValidator, 
    validateNoExtraFields, 
    validateRequiredFields, 
    validationChain 
} from "./validators.js";

const validateLogs = (log) => {
    if (!Array.isArray(log)) {
        throw new ValidationError("Log must be an array");
    }
    log.forEach(item => {
        const allowedFields = ["fighter1Shot", "fighter2Shot", "fighter1Health", "fighter2Health"];
        validateRequiredFields(item, allowedFields);
        validateNoExtraFields(item, allowedFields);
    })
}

const createFightValid = validationChain([
    // Ensure no extra fields and "id" is not included
    noRedundantValidator(FIGHT),
    // Ensure required fields are present
    (body) => validateRequiredFields(body, ["fighter1", "fighter2"]),
    // Validate specific attributes (logs)
    (body) => {
        if (body.log) validateLogs(body.log);
    }
]);

export { createFightValid }