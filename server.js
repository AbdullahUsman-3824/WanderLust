// Load environment variables from a .env file in non-production environments
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const dbURL = process.env.ATLASDB_URL;

// Express setup
const express = require("express");
const app = express();
const port = 3000;

// Required modules
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override"); // Import Method Override for HTTP verb support
const ejsMate = require("ejs-mate"); // Import ejs-mate for EJS layout support

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Session and authentication
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const User = require("./models/users");
const passport = require("passport"); // Import Passport for authentication

// Set up views directory and view engine
app.set("views", path.join(__dirname, "/views")); // Set the views directory
app.set("view engine", "ejs"); // Set EJS as the view engine

// Session options configuration
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

store.on("error", () => {
  console.log("Session store error", err);
});

const sessionOption = {
  store,
  secret: process.env.SECRET, // Secret key for session encryption
  resave: false, // Prevent resaving sessions that haven't changed
  saveUninitialized: true, // Save uninitialized sessions
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Cookie expiration date
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie maximum age
    httpOnly: true, // HTTP only flag for security
  },
};

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(methodOverride("_method")); // Override HTTP methods
app.engine("ejs", ejsMate); // Set EJS Mate as the engine for EJS
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the public directory
app.use(session(sessionOption)); // Use session middleware with the defined options
app.use(flash()); // Use flash messages
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session support

// Configure Passport with the User model for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB using Mongoose

(async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("> Connected to MongoDB"); // Log successful connection
  } catch (error) {
    console.error("> Error connecting to MongoDB:", error.message); // Log connection error
    process.exit(1); // Exit process with failure
  }
})();

// Middleware to set up flash messages and current user for all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Define route handlers
app.use("/listings", listingRouter); // Use listing router for "/listings" routes
app.use("/listings/:id/reviews", reviewRouter); // Use review router for "/listings/:id/reviews" routes
app.use("/", userRouter); // Use user router for root routes

// Catch-all route for handling 404 errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!!"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message } = err; // Destructure error object with default status 500
  res.status(status).render("error.ejs", { err }); // Render error view with the error object
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port); // Log server running status
});
