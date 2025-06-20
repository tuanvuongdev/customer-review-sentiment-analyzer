import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../core/error.response';
import { StatusCodes } from '../const/statusCodes';
import { ReasonPhrases } from '../const/reasonPhrases';

export const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(
                new BadRequestError(
                    ReasonPhrases.BAD_REQUEST,
                    StatusCodes.BAD_REQUEST,
                    error.errors.map((err: any) => ({
                        path: err.path.join("."),
                        message: err.message
                    }))
                )
            );
        }
        return next();
    }
}