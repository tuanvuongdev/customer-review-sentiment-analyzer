import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../core/error.response';
import { StatusCodes } from '../const/statusCodes';
import { ReasonPhrases } from '../const/reasonPhrases';

export const validate = (schemaClass: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schemaClass.validate(req.body);

        if (!result.success) {
            return next(
                new BadRequestError(
                    ReasonPhrases.BAD_REQUEST,
                    StatusCodes.BAD_REQUEST,
                    result.error.issues.map((err: any) => ({
                        path: err.path.join("."),
                        message: err.message
                    }))
                )
            );
        }

        // Attach validated data to request
        req.body = result.data;
        return next();
    }
}