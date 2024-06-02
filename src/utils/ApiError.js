class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something is wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
            this.message = message,
            this.errors = errors,
            this.data = null,
            this.success = false


        if (stack) {
            this.stack = statck;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}
export { ApiError }