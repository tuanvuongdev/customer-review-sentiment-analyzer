import { Request, Response } from "express";
import SuccessResponse from "../core/success.response";
import { analyzeSentiment, findAllReviews } from "../services/review.service";
import { GetReviewsRequest } from "../types/review.types";
import { StatusCodes } from "../const/statusCodes";

const analyze = async (req: Request, res: Response) => {
    return new SuccessResponse({
        message: "Review analyzed successfully",
        metadata: await analyzeSentiment(req.body),
        statusCode: StatusCodes.CREATED
    }).send(res)
}

const getReviews = async (req: Request, res: Response) => {
    const { page, limit } = req.query as unknown as GetReviewsRequest;
    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.max(1, Number(limit) || 10);

    return new SuccessResponse({
        message: "Reviews fetched successfully",
        metadata: await findAllReviews({ page: pageNumber, limit: limitNumber })
    }).send(res)
}

export {
    analyze,
    getReviews
}