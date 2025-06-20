import { Request, Response } from "express";
import SuccessResponse from "../core/success.response";
import { analyzeSentiment } from "../services/review.service";

const analyze = async (req: Request, res: Response) => {
    return new SuccessResponse({
        message: "Review analyzed successfully",
        metadata: analyzeSentiment(req.body)
    }).send(res)
}

const getReviews = async (req: Request, res: Response) => {
    return new SuccessResponse({
        message: "Reviews fetched successfully",
        metadata: {
            reviews: []
        }
    }).send(res)
}

export {
    analyze,
    getReviews
}