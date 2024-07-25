const express = require("express");
const router = express.Router();

// Model, Middleware, Controller Imports
const User = require("../models/users");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveUrl } = require("../middlewares");
const userController = require("../controller/user.js");

// Signup Routes
router
  .route("/signup")
  .get(userController.renderSignupForm) // Render signup form
  .post(wrapAsync(userController.signup)); // Handle signup form submission

// Login Routes
router
  .route("/login")
  .get(userController.renderLoginForm) // Render login form
  .post(
    saveUrl, // Middleware to save redirect URL
    // Passport local authentication strategy
    passport.authenticate("local", {
      failureFlash: true, // Enable flash messages on authentication failure
      failureRedirect: "/login", // Redirect to login page on failure
    }),
    wrapAsync(userController.login) // Handle successful login
  );

// Logout Route
router.get("/logout", userController.logout); // Handle logout

// Export the router to be used by other parts of the application
module.exports = router;
