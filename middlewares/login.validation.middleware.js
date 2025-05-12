import { noRedundantValidator, validateRequiredFields, validationChain } from "./validators.js";

const loginAttributes = ["email", "password"];

const loginValid = validationChain([
    // Ensure no extra fields and "id" is not included
    noRedundantValidator(loginAttributes),
    // Ensure required fields are present
    (body) => validateRequiredFields(body, loginAttributes)
]);

export { loginValid };