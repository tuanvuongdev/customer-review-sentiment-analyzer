import { axiosClient, axiosServer } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { IResponse, ISearchResponse } from "../types/common.type";
import { ReviewProps } from "../types/review.type";

export const analyzeReview = async (text: string) => {
    const response: AxiosResponse<IResponse<ReviewProps>> = await axiosClient.post('/analyze', { text });
    return response.data;
}

export const getReviews = async (page: string, limit: string) => {
    const response: AxiosResponse<ISearchResponse<ReviewProps>> = await axiosServer.get(`/reviews?page=${page}&limit=${limit}`);
    return response.data.metadata;
}