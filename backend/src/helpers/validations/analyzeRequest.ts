import { z } from 'zod';

interface AnalyzeRequestData {
    text: string;
}

class AnalyzeRequest {
    text: string;

    constructor(data: AnalyzeRequestData) {
        this.text = data.text;
    }

    static validate(data: AnalyzeRequestData) {
        const schema = z.object({
            text: z.string().min(1, "Text is required").max(500, "Text must be less than 500 characters")
        });

        return schema.safeParse(data);
    }
}

export default AnalyzeRequest;