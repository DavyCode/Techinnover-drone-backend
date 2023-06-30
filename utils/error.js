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

const errorHandler = (error, req, res, next) => {
	/**
	 * log the error message, and meta object
	 */
	let respondWith = {
		errors: [error.message ? error.message : "Something went wrong"],
		statusCode: error.statusCode? error.statusCode : 500,
		status: "failure",
	};

	if (process.env.NODE_ENV === "development" && !(error instanceof APIError)) {
		respondWith = Object.assign({}, respondWith, { stack: error.stack });
	}

	if (process.env.NODE_ENV === "production" && !(error instanceof APIError)) {
		// Push to logger in production
	}

	res.status(error.statusCode ? error.statusCode : 500).json(respondWith);
};

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
	errorHandler
}

