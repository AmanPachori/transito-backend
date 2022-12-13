const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const VerifyToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      
      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success:false,
        message:'User Not authorized',
      })
    }
    if (!token) {
      res.status(400).json({
        success:false,
        message:'No token found',
      })
    }
  }
});

module.exports = { VerifyToken };