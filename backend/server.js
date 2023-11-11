import express from "express";
dotenv.config();
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

// app
const app = express();

// api
app.get("/", (req, res) => {
  res.send("API running");
});

// routes
app.use("/api/products", productRoutes);
// error handlers (must be after routes)
app.use(notFound);
app.use(errorHandler);

// port
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
