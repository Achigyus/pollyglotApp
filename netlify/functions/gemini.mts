import type { Context } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
const apiKey = Netlify.env.get("VITE_GEMINI_API_KEY");
if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY environment variable");
}
const apikey2 = process.env.VITE_GEMINI_API_KEY;
if (!apikey2) {
    throw new Error("Missing VITE_GEMINI_API_KEY2 environment variable");
}
console.log("API Key loaded successfully", apiKey, apikey2);

export default async (req: Request, context: Context) => {
    const { text, language } = await req.json();
    if (!text || !language) {
        return new Response('Missing text or language', { status: 400 });
    }
    try {
        const ai = await new GoogleGenAI({});
        console.log(ai)
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Translate the following text to ${language}: "${text}". Answer with just the translated text, no additional commentary and no formatting.`,
            config: {
                systemInstruction: "You are pollyglot AI. Your aim is to assist users in translating text.",
                temperature: 1.0,
                maxOutputTokens: 1024,
            },
        });
        return new Response(response.text, { status: 200 });
    } catch (error) {
        console.error('Error generating content:', error);
        return new Response('Error generating content', { status: 500 });
    }
};