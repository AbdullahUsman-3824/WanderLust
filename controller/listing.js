const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Fetch all listings and render the index page
module.exports.indexPage = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render the form for creating a new listing
module.exports.renderNewListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Create a new listing
module.exports.createNewListing = async (req, res) => {
  // Check if an image file is uploaded
  if (!req.file) {
    req.flash("error", "Please upload an image.");
    return res.redirect("/listings/new");
  }

  // Extract image URL and filename from uploaded file
  const url = req.file.path;
  const fileName = req.file.filename;

  // Create a new listing object from request body
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // Associate logged-in user as the owner

  // Set image URL and filename in the new listing object
  newListing.image = { url, fileName };

  // Save the new listing to the database
  await newListing.save();

  // Redirect to listings page with success flash message
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};

// Show a specific listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } }) // Populate reviews with author details
    .populate("owner"); // Populate owner details
  if (!listing) {
    req.flash("error", "Listing you are trying to access doesn't exist");
    res.redirect("/listings");
  }

  // Use Mapbox Geocoding API to fetch coordinates based on listing location
  let response = await geocodingClient
    .forwardGeocode({
      query: listing.location,
      limit: 1,
    })
    .send();
  let coordinates = response.body.features[0].center;

  // Render the listing detail page with listing and coordinates
  res.render("listings/show.ejs", { listing, coordinates });
};

// Render the edit form for a specific listing
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you are trying to access doesn't exist");
    res.redirect("/listings");
  }
  // Render the edit form with the listing data
  res.render("listings/edit.ejs", { listing });
};

// Update an existing listing
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

  // If an image file is uploaded, update image URL and filename
  if (req.file) {
    const url = req.file.path;
    const fileName = req.file.filename;
    listing.image = { url, fileName };
    await listing.save();
  }

  // Redirect to the updated listing detail page with success flash message
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete a listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(`Deleted object: ${deleteListing}`);
  // Redirect to listings page with success flash message
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
