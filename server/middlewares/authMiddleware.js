const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
      data: null,
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Add user from payload
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password from the user object
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "Token is not valid",
      data: null,
    });
  }
};

module.exports = authenticate;
