import express from "express";

import { getProducts, getProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
// route handles different get, post, delete, etc. requests

export default router;
