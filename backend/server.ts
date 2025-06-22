import app from "./src/app";

const PORT = process.env.PORT || 3056
const HOST = process.env.HOST || "localhost"

app.listen(Number(PORT), HOST, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Binding to host: ${HOST}`);
})