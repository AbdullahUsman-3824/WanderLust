// Import required models
const Listing = require("./models/listing");
const Review = require("./models/review");

// Import multer for file uploading and configure storage with custom settings
const multer = require("multer");
const { storage } = require("./cloudConfig.js"); // Custom cloud storage configuration

// Configure multer for single file upload with 2MB file size limit
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
}).single("listing[image]"); // Expecting a single file under the name 'listing[image]'

// Middleware to check if the user is logged in
module.exports.isLoggedin = (req, res, next) => {
  // Check if the user is not authenticated
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save the original URL to session
    req.flash("error", "Use must be logged in !");
    return res.redirect("/login");
  }
  next();
};

// Middleware to save the redirect URL to local variables
module.exports.saveUrl = (req, res, next) => {
  // Check if there's a redirect URL saved in session
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Save it to local variables
  }
  next();
};

// Middleware to check if the current user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  // Check if the current user is not the owner
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "Access denied!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware to check if the current user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  // Check if the current user is not the author
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware to handle image uploads with multer
module.exports.uploadImage = async (req, res, next) => {
  upload(req, res, (err) => {
    // Check if there's a Multer error
    if (err instanceof multer.MulterError) {
      // Handle specific Multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        // File size limit error
        req.flash("error", "Image size must be less than 2MB");
        return res.redirect("/listings/new");
      }
      req.flash("error", err.message); // Flash a general Multer error message
      return res.redirect("/listings/new");
    }
    next();
  });
};
