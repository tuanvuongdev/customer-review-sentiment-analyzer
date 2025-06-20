import { Request, Response } from "express";
import SuccessResponse from "../core/success.response";
import { analyzeSentiment, findAllReviews } from "../services/review.service";
import { GetReviewsRequest } from "../types/review.types";

const analyze = async (req: Request, res: Response) => {
    return new SuccessResponse({
        message: "Review analyzed successfully",
        metadata: await analyzeSentiment(req.body)
    }).send(res)
}

const getReviews = async (req: Request, res: Response) => {
    const { page, limit } = req.query as unknown as GetReviewsRequest;
    const pageNumber = page || 1;
    const limitNumber = limit || 10;

    return new SuccessResponse({
        message: "Reviews fetched successfully",
        metadata: await findAllReviews({ page: pageNumber, limit: limitNumber })
    }).send(res)
}

export {
    analyze,
    getReviews
}