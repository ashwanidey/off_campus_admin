import express from 'express';
import {
  getBasicReports,
  getCohortStats,
  getServiceStats,
  getTotalSale,
  getWebinarStats,
} from '../controllers/dataExposeController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/get-reports:
 *   get:
 *     summary: Get basic reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved basic reports
 */
router.get('/get-reports', getBasicReports);

/**
 * @swagger
 * /api/v1/get-webinar-reports:
 *   get:
 *     summary: Get webinar statistics
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved webinar statistics
 */
router.get('/get-webinar-reports', getWebinarStats);

/**
 * @swagger
 * /api/v1/get-cohort-reports:
 *   get:
 *     summary: Get cohort statistics
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved cohort statistics
 */
router.get('/get-cohort-reports', getCohortStats);

/**
 * @swagger
 * /api/v1/get-services-reports:
 *   get:
 *     summary: Get service statistics
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved service statistics
 */
router.get('/get-services-reports', getServiceStats);

/**
 * @swagger
 * /api/v1/get-total-sale:
 *   get:
 *     summary: Get total sale data
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved total sale data
 */
router.get('/get-total-sale', getTotalSale);

export default router;
