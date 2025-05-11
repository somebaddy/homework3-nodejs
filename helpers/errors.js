/** Additional classes with particular code errors
 * 
 * 
 */

class Error400 extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.code = 400;
    }
}

class Error401 extends Error {
    constructor(message) {
        super(message);
        this.name = "Unauthorized";
        this.code = 401;
    }
}

class Error404 extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFound";
        this.code = 404;
    }
}

class Error500 extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.code = 500;
    }
}

class ValidationError extends Error400 {

}


export {
    Error400,
    Error401,
    Error404,
    Error500,
    ValidationError
};