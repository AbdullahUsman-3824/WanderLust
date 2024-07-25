const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

// Define the schema for the User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Enhance the schema with passportLocalMongoose plugin
userSchema.plugin(passportLocalMongoose);

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
