import express from "express";
import dotenv from "dotenv";

import products from "./data/products.js";
// remember to add .js

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
