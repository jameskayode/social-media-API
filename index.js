import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/user-routes";
import blogRouter from "./routes/blog-route";

const app = express();
app.use(express.json());
app.use("/user", router);
app.use("/blog", blogRouter);

// MongoDB connection URL
const dbURI = process.env.MONGODB_URI; 

mongoose
  .connect(dbURI)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Connected to DB and server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
