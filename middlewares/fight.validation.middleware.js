import { FIGHT } from "../models/fight.js";
import { handleValidationError } from "./helpers.js";
import { validateNoExtraFields, validateNoIdFieldInBody, validateRequiredFields } from "./validators.js";

const createFightValid = (req, res, next) => {
    try {
        validateNoIdFieldInBody(req.body);

        const allowedFields = Object.keys(FIGHT);
        validateNoExtraFields(req.body, allowedFields);

        const requiredFields = ["fighter1", "fighter2"];
        validateRequiredFields(req.body, requiredFields);

        next();
    } catch (error) {
        handleValidationError(error, res);
    }
}

export { createFightValid }