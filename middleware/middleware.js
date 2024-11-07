const myMiddleware = (req, res, next) => {
  console.log('This is a middleware function');
  next(); // Call next to pass control to the next middleware function
};

module.exports = myMiddleware;