import path from "path";
import express from "express";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

// app
const app = express();

// body parser middleware
app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded

// cookie parser middleware
app.use(cookie()); // for parsing cookies

// api
app.get("/", (req, res) => {
  res.send("API running");
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// paypal
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// uploads (static directory)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// error handlers (must be AFTER routes)
app.use(notFound);
app.use(errorHandler);

// port
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
