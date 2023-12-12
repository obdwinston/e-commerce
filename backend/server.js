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

const port = process.env.PORT || 5000;

connectDB();

// app
const app = express();

// body parser middleware
app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded

// cookie parser middleware
app.use(cookie()); // for parsing cookies

// routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// paypal
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// run "npm run build" in production
// run "npm run server" in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // set static folder for product image upload
  app.use("/uploads", express.static("/var/data/uploads"));

  // set static folder for production mode
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  // any non-api routes redirected to index.html in frontend build folder
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();

  // set static folder for product image upload
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

  // api server
  app.get("/", (req, res) => {
    res.send("API server running");
  });
}

// error handlers (must be AFTER routes)
app.use(notFound);
app.use(errorHandler);

// port
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
