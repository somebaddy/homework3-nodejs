import { ValidationError } from "../helpers/errors.js";
import { FIGHT } from "../models/fight.js";
import { handleValidationError } from "./helpers.js";
import { validateNoExtraFields, validateNoIdFieldInBody, validateRequiredFields } from "./validators.js";

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

const createFightValid = (req, res, next) => {
    try {
        validateNoIdFieldInBody(req.body);

        const allowedFields = Object.keys(FIGHT);
        validateNoExtraFields(req.body, allowedFields);

        const requiredFields = ["fighter1", "fighter2"];
        validateRequiredFields(req.body, requiredFields);

        if (req.body.log) validateLogs(req.body.log);

        next();
    } catch (error) {
        handleValidationError(error, res);
    }
}

export { createFightValid }