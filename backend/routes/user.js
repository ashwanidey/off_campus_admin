import express from "express";
import {
  getChinmaySessions,
  getResumeReview,
  getSession,
  getUser,
  getUsers,
  getWebinars,
  getAllCourses,
} from "../controller/userController.js";
import { sendTestimonialEmail } from "../controller/emailController.js";

const Router = express.Router();

Router.get("/get-users", getUsers);
Router.get("/get-user/:id", getUser);
Router.get("/get-session", getSession);
Router.get("/get-review", getResumeReview);
Router.get("/get-webinars", getWebinars);
Router.get("/get-chinmay-session", getChinmaySessions);
Router.post("/send-testimonial-email", sendTestimonialEmail);
Router.get("/get-courses", getAllCourses);

export default Router;
