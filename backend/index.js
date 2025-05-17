import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import { Expert } from "./models/Experts.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then( async() => {
    console.log("Connected to MongoDB");

    const expert = await Expert.findOne({id : 101})


    app.listen(PORT, () => {
      console.log(`Server is running at Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
