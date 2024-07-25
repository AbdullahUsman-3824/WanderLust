// Import Joi for schema validation
const Joi = require("joi");

// Import custom error class for handling errors
const ExpressError = require("./utils/ExpressError.js");

// Define a Joi schema for validating listings
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
  }).required(),
});

// Define a Joi schema for validating reviews
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});

// Validator function to use Joi schemas for validation
const validator = (schema) => {
  return (req, res, next) => {
    // Validate the request body against the provided schema
    let { error } = schema.validate(req.body);

    // If there is a validation error, create an error message and throw an ExpressError
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg); // Pass status code 400 (Bad Request) and error message
    } else {
      next(); // If validation passes, proceed to the next middleware or route handler
    }
  };
};

// Create middleware functions for validating listings and reviews
const validateListing = validator(listingSchema); // Middleware for validating listings
const validateReview = validator(reviewSchema); // Middleware for validating reviews

// Export the validation middleware functions for use in other parts of the application
module.exports = { validateListing, validateReview };
