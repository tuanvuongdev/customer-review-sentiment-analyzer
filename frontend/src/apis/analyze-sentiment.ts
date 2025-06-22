import axiosServices from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ReviewProps } from "../types/review.type";
import { IResponse, ISearchResponse } from "../types/common.type";

export const analyzeReview = async (text: string) => {
    const response: AxiosResponse<IResponse<ReviewProps>> = await axiosServices.post('/analyze', { text });
    return response.data;
}

export const getReviews = async (page: string, limit: string) => {
    const response: AxiosResponse<ISearchResponse<ReviewProps>> = await axiosServices.get(`/reviews?page=${page}&limit=${limit}`);
    return response.data.metadata;
}