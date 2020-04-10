/**
 * An unsuccessful request.
 */
export class RequestFailed extends Error {
    constructor(message, statusCode, responseData = undefined) {
        super(message);
        this.message = `RequestError: ${message} (HTTP ${statusCode})`;
        this.statusCode = statusCode;
        this.responseData = responseData;
    }
}
