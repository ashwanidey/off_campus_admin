import express from 'express';
import { getBasicReports, getCohortStats, getServiceStats, getTotalSale, getWebinarStats } from '../controllers/dataExposeController.js';

const router = express.Router();

router.get('/get-reports',getBasicReports);
router.get('/get-webinar-reports',getWebinarStats);
router.get('/get-cohort-reports',getCohortStats);
router.get('/get-services-reports',getServiceStats);
router.get('/get-total-sale',getTotalSale);

export default router;