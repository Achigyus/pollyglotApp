import type { Context } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
    apiKey: Netlify.env.get("VITE_GEMINI_API_KEY")
});

export default async (req: Request, context: Context) => {
    const { text, language } = await req.json();
    if (!text || !language) {
        return new Response('Missing text or language', { status: 400 });
    }
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Translate the following text to ${language}: "${text}". Answer with just the translated text, no additional commentary and no formatting.`,
        config: {
            systemInstruction: "You are pollyglot AI. Your aim is to assist users in translating text.",
            temperature: 1.0,
            maxOutputTokens: 1024,
        },
    });
    console.log(response.text);
    return new Response(response.text, { status: 200 });
};