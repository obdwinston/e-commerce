import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

import generateToken from "../utilities/generateToken.js";

// @desc sign up user
// @route POST /api/users
// @access public
const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password,
    // isAdmin defaulted to false
  });

  if (user) {
    //  generate JWT
    generateToken(res, user._id);

    res.status(201).json({
      // status code 201 created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc authenticate user and get token
// @route POST /api/users/signin
// @access public
const signInUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  // generate JWT
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      // status code 200 OK
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc sign out user and clear cookie
// @route POST /api/users/signout
// @access private
const signOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Signed out successfully" });
});

// @desc get user profile
// @route GET /api/users/profile (with token)
// @access public
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // req object contains user info from protect middleware

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user profile
// @route PUT /api/users/profile (with token)
// @access private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    // note user.save() is NOT User.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get users
// @route GET /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("admin: get users");
});

// @desc get user
// @route GET /api/users/:id
// @access private/admin
const getUser = asyncHandler(async (req, res) => {
  res.send("admin: get user");
});

// @desc delete user
// @route DELETE /api/users/:id
// @access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("admin: delete user");
});

// @desc update user
// @route PUT /api/users/:id
// @access private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("admin: update user");
});

export {
  signUpUser,
  signInUser,
  signOutUser,
  getProfile,
  updateProfile,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
