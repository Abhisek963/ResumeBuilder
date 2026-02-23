import express from "express";
import protect from '../middleware/authMiddleware.js';
import { enhanceProSummary, enhanceJobDescription, uploadResume } from "../controllers/aiController.js";


const aiRouter = express.Router();


aiRouter.post('/enhance-pro-summary',protect, enhanceProSummary);
aiRouter.post('/enhance-job-description',protect, enhanceJobDescription);
aiRouter.post('/upload-resume',protect, uploadResume);


export default aiRouter;