const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for the Review model
const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Export the Review model based on the schema
module.exports = mongoose.model("Review", reviewSchema);
