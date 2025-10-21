
class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went to wrong",
        errors = [],
        stack= ""
        ){
        super(message);
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.success = false,
        this.errors = errors

        if (stack) { // If a stack trace is provided, use it
            this.stack = stack
        } else{ // Otherwise, capture the stack trace from the current context
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}