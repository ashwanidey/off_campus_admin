import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors())

const PORT = process.env.PORT || 8080;

app.use("/users", userRoutes)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    
    app.listen(PORT, () => {
      console.log(`Server is running at Port: ${PORT}`);
      
    });
    
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  });