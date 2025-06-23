import express, { NextFunction, Request, Response } from "express";
import routes from "./routes"
import { CustomError } from "./types/error.types";
import cors from 'cors';
import { StatusCodes } from "./const/statusCodes";
import { ReasonPhrases } from "./const/reasonPhrases";
import { NotFoundError } from "./core/error.response";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// init routes
app.use("/", routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: StatusCodes.OK, timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res, next) => {
    next(new NotFoundError());
});

// Global error handler
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: statusCode,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
        errors: error.errors || []
    });
});

export default app;
