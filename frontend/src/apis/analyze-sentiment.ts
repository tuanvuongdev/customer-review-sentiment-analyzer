import axiosServices from "@/libs/axios";
import { AxiosResponse } from "axios";
import { ReviewProps } from "../../types/review.type";
import { ISearchResponse } from "../../types/common.type";

export const analyzeReview = async (text: string) => {
    const response = await axiosServices.post('/api/analyze', { text });
    return response.data;
}

export const getReviews = async (page: string, limit: string) => {
    const response: AxiosResponse<ISearchResponse<ReviewProps>> = await axiosServices.get(`/api/reviews?page=${page}&limit=${limit}`);
    return response.data.metadata;
}