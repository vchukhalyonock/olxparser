class Error {
    status = 500;

    statusMessage = 'Internal Error';

    constructor(statusMessage, status) {
        if (statusMessage) {
            this.statusMessage = statusMessage;
        }

        if (status) {
            this.status = status;
        }
    }
}

export default Error;
