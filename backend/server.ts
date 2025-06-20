import app from "./src/app";

const PORT = process.env.PORT || 3056

app.listen(Number(PORT), "localhost", () => {
    console.log(`Server running on port ${PORT}`);
})