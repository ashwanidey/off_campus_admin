import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { Expert } from "./models/Experts.js";
import dataExposeRoutes from "./routes/dataExposeRoutes.js";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
  origin: '*', // allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'] // allow specific headers
}));

const PORT = process.env.PORT || 8080;


app.use("/api/v1", dataExposeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



mongoose
  .connect(process.env.MONGO_URL)
  .then( async() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running at Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
