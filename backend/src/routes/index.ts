import express from "express"
const router = express.Router();

import reviewRoute from "./review"

router.use("/api", reviewRoute)

export default router