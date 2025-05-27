import express from "express";
import {
  createJobOpening,
  uploadCompanyImage,
  companiesLogoList,
} from "../controller/jobOpeningController.js";

const router = express.Router();

router.post("/create-job-opening", createJobOpening);
router.post("/upload-company-image", uploadCompanyImage);
router.get("/companies-logo-list", companiesLogoList);

export default router;
