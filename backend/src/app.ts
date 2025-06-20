import express from "express";

import "dotenv/config";

// Extend Error interface to include status property
interface CustomError extends Error {
    status?: number;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init routes
app.use("/", require("./routes"));

// handling error
app.use((req, res, next) => {
    const error = new Error("Not Found") as CustomError;
    error.status = 404;

    next(error);
});

app.use((error: CustomError, req: express.Request, res: express.Response) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
