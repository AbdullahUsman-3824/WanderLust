const Listing = require("../models/listing");
const Review = require("../models/review");

// Create a new review for a specific listing
module.exports.createNewReview = async (req, res) => {
  // Find the listing based on ID from request parameters
  let listing = await Listing.findById(req.params.id);

  // Create a new review object from request body
  let newReview = new Review(req.body.review);

  // Associate the logged-in user as the author of the review
  newReview.author = req.user._id;

  // Push the new review to the listing's reviews array
  listing.reviews.push(newReview);

  // Save the new review and the updated listing to the database
  await newReview.save();
  await listing.save();

  // Redirect to the listing detail page with success flash message
  req.flash("success", "New Review Added");
  res.redirect(`/listings/${listing._id}`);
};

// Delete a review from a listing
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove the review ID from the listing's reviews array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the review from the database
  await Review.findByIdAndDelete(reviewId);

  // Redirect to the listing detail page with success flash message
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
