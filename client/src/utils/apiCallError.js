class ApiCallError extends Error {
    constructor(response, responseBody) {
        super(response.statusText)
        this.name = this.constructor.name;
        this.status = response.status
        this.body = responseBody
    }
}

export default ApiCallError