/** Additional classes with particular code errors
 * 
 * 
 */

class Error400 extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.statusCode = 400;
    }
}

class Error401 extends Error {
    constructor(message) {
        super(message);
        this.name = "Unauthorized";
        this.statusCode = 401;
    }
}

class Error404 extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFound";
        this.statusCode = 404;
    }
}

class Error500 extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = 500;
    }
}


module.exports = {
    Error400,
    Error401,
    Error404,
    Error500
};