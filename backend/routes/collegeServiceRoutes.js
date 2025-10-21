import express from "express";
import {
  getAllCollegeServices,
  getCollegeServiceById,
} from "../controller/collegeserviceController.js";

const router = express.Router();

router.get("/", getAllCollegeServices);
router.get("/:serviceId", getCollegeServiceById);

export default router;
