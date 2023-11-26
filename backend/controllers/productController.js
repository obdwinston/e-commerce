import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc get products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // empty object {} finds all products
  res.status(200).json(products);
});

// @desc get product
// @route GET /api/products/:id
// @access public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProduct };
