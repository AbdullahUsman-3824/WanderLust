const User = require("../models/users");

module.exports.renderSignupForm = (req, res) => {
  // Render the signup form view
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    // Extract username, email, and password from request body
    let { username, email, password } = req.body;

    // Create a new User instance with username and email
    let newUser = new User({ username, email });

    // Register the new user with the provided password using Passport's register method
    let registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    // Log in the registered user
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      // Redirect to listings page upon successful login
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    });
  } catch (e) {
    // Handle any errors during user registration or login process
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Render the login form view
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Flash success message upon successful login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back to WanderLust!");

  // Redirect user to previously intended URL or listings page
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Log out the user
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    // Flash success message upon successful logout
    req.flash("success", "You are logged Out!");
    res.redirect("/listings");
  });
};
