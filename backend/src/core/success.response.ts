import { Response } from 'express';

const StatusCode = {
    OK: 200,
    CREATED: 201
} as const;

const ReasonStatusCode = {
    CREATED: 'Created!',
    OK: 'Success'
} as const;

interface SuccessResponseOptions {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: any;
}

export default class SuccessResponse {
    public message: string;
    public status: number;
    public metadata: any;

    constructor({
        message,
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonStatusCode.OK,
        metadata = {}
    }: SuccessResponseOptions) {
        this.message = message ? message : reasonStatusCode;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res: Response, headers: Record<string, string> = {}): Response {
        return res.status(this.status).json(this);
    }
} 