import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

import User from "../models/userModel.js";

// protect middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // get token from cookie
  token = req.cookies.jwt;
  // .cookies enabled from cookie-parser package imported in server.js
  // .jwt named from res.cookie in userControllers.js

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); // leaves out password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised (token failed)");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised (no token)");
  }
});

// admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorised (not admin)");
  }
};

export { protect, admin };
