import { Router } from "express";
import { createTestimonial } from "../controller/testimonialController.js";
const router = Router();

router.post("/create-testimonial", createTestimonial);

export default router;
