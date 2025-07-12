import { Router } from "express";
import {
  getUser,
  insertCourseIntoUser,
  extendCourse,
} from "../controller/addController.js";

const router = Router();

router.post("/get-user", getUser);
router.post("/add-into-course", insertCourseIntoUser);
router.post("/extend-course", extendCourse);
export default router;
