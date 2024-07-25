module.exports = (fn) => {
    // Exporting a function that takes another function `fn` as an argument
    return (req, res, next) => {
      // Returns a new function that takes `req`, `res`, and `next` as arguments
      fn(req, res, next).catch(next);
      // Calls the provided `fn` with `req`, `res`, and `next`, and catches any errors using `.catch(next)`
    };
  };
  