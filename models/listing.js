const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

// Define the schema for the Listing model
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    fileName: String,
  },
  price: {
    type: Number,
    min: [1, "Price too low"],
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Define post middleware to remove associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Export the Listing model based on the schema
module.exports = mongoose.model("Listing", listingSchema);
