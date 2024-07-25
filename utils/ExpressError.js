class ExpressError extends Error {
  constructor(status, message) {
    super(); // Call the constructor of the Error class

    this.status = status;
    this.message = message;
  }
}
module.exports = ExpressError;
