import express from "express";

import {
  signUpUser,
  signInUser,
  signOutUser,
  getProfile,
  updateProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(signUpUser).get(protect, admin, getUsers);
router.post("/signout", signOutUser);
router.post("/signin", signInUser);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);
router
  .route("/:id")
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
