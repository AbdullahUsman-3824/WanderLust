const express = require("express");
const router = express.Router({ mergeParams: true });

// Middleware and Controller Imports
const { isLoggedin, isReviewAuthor } = require("../middlewares.js");
const reviewController = require("../controller/review.js");
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../schemaValidator.js");

// Create review route
router.post(
  "/",
  isLoggedin, // Middleware to check if user is logged in
  validateReview, // Middleware to validate review data
  wrapAsync(reviewController.createNewReview) // POST request to create a new review
);

// Delete review route
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview) // DELETE request to delete a specific review
);

// Export the router to be used by other parts of the application
module.exports = router;
