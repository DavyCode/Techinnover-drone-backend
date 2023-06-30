class APIError extends Error {
  statusCode;
  constructor(statusCode = 500, message = `Unknown Server Error.`, data = {}) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends APIError {
	constructor(message) {
		super(400, message);
	}
}

class NotFoundError extends APIError {
	constructor(message) {
		super(404, message || "Not Found");
	}
}

class InternalServerError extends APIError {
	constructor(message) {
		super(500, message);
	}
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError
}

