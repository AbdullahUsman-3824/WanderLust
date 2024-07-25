const express = require("express");
const router = express.Router();

// Middlewares
const wrapAsync = require("../utils/wrapAsync");
const { validateListing } = require("../schemaValidator.js");
const { isLoggedin, isOwner, uploadImage } = require("../middlewares.js");
const listingController = require("../controller/listing.js");

// Index Route
router
  .route("/")
  .get(wrapAsync(listingController.indexPage)) // GET request to list all listings
  .post(
    isLoggedin, // Middleware to check if user is logged in
    uploadImage, // Middleware to handle image upload
    validateListing, // Middleware to validate listing data
    wrapAsync(listingController.createNewListing) // POST request to create a new listing
  );

// New Route
router.get("/new", isLoggedin, listingController.renderNewListingForm); // GET request to render new listing form

// Specific Listing Routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // GET request to show a specific listing
  .put(
    isLoggedin,
    isOwner,
    validateListing,
    wrapAsync(listingController.editListing) // PUT request to edit a specific listing
  )
  .delete(
    isLoggedin,
    isOwner,
    wrapAsync(listingController.destroyListing) // DELETE request to delete a specific listing
  );

// Edit Route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  uploadImage,
  wrapAsync(listingController.renderEditForm)
); // GET request to render edit form for a specific listing

module.exports = router;
