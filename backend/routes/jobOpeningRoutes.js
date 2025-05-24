import express from 'express';
import { createJobOpening, uploadCompanyImage } from '../controller/jobOpeningController.js';

const router = express.Router();

router.post('/create-job-opening',createJobOpening )
router.post('/upload-company-image', uploadCompanyImage);

export default router;