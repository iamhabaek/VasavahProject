const { admin } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  // Initialize token
  let token;
  // Check if theirs authorization headers first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Set token
      token = req.headers.authorization.split(" ")[1];
      // Verify token using the admin sdk
      const decoded = admin.auth().verifyIdToken(token);
      // intialize user
      req.user = decoded;
      // Proceed to next middleware or to controls
      next();
    } catch (error) {
      console.log(error);
      // Sending error response
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  // check if theres no token
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no Token");
  }
});

module.exports = {
  protect,
};
