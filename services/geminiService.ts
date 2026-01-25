import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In production, this would be strictly env variable.
// Note: In a real client-side app, you might proxy this through a backend to protect the key, 
// or use a user-provided key for demo purposes as requested in the system instructions.
// For this demo, we assume the environment variable is injected.

let ai: GoogleGenAI | null = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const getStyleAdvice = async (prompt: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning mock response.");
    return "Our AI Heritage Consultant is currently offline. Please try again later or consult with Masterji directly.";
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert Indian Heritage Fashion Consultant for BharatTailor Network. 
      Tone: Respectful, knowledgeable about fabrics (Silk, Khadi, Wool, Linen), and culturally aware.
      Provide brief, high-value advice (max 100 words) for the following query: ${prompt}`,
    });
    return response.text || "Unable to generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "We are experiencing high traffic with our AI Consultant. Please try again.";
  }
};
