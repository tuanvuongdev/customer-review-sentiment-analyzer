import express from "express"
import { asyncHandler } from "../../helpers/asyncHandler";
import { analyze, getReviews } from "../../controllers/review.controller";
import AnalyzeRequest from "../../helpers/validations/analyze.request";
import { validate } from "../../helpers/validate";

const router = express.Router();

router.post("/analyze", validate(AnalyzeRequest), asyncHandler(analyze));
router.get("/reviews", asyncHandler(getReviews));

export default router