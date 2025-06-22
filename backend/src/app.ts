import express, { NextFunction, Request, Response } from "express";
import routes from "./routes"
import helmet from "helmet";
import { CustomError } from "./types/error.types";
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// init routes
app.use("/", routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res, next) => {
    const error = new Error("Not Found") as CustomError;
    error.status = 404;

    next(error);
});

// Global error handler
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error",
        errors: error.errors || []
    });
});

export default app;
