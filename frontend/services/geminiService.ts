
import { GoogleGenAI, Type } from "@google/genai";
import { Employee } from "../types";

// Fixed: Strictly followed Google GenAI SDK guidelines for API key initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePerformanceSummary = async (employee: Employee): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional 2-sentence HR performance summary for an employee in a Project Management Bureau. 
      Name: ${employee.firstName} ${employee.lastName}, 
      Role: ${employee.role}, 
      Department: ${employee.department}, 
      Project: ${employee.currentProject || 'None'},
      Skills: ${employee.skills.join(', ')}.`,
      config: {
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate summary at this time.";
  }
};

export const suggestOnboardingChecklist = async (role: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a JSON array of 5 specific onboarding tasks for a new '${role}' at a PMO agency. Return only the array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return ["General Orientation", "System Access", "Team Introduction", "Project Overview", "Safety Briefing"];
  }
};
