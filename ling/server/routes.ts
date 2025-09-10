import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { translateRequestSchema } from "@shared/schema";
import { z } from "zod";

// LibreTranslate API integration
async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<{ translatedText: string; confidence?: string }> {
  const apiKey = process.env.RAPIDAPI_KEY;
  
  // Use RapidAPI OpenL Translate service
  if (!apiKey) {
    throw new Error("RapidAPI key not configured");
  }
  
  try {
    const response = await fetch('https://openl-translate.p.rapidapi.com/translate', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'openl-translate.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target_lang: targetLanguage,
        text: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => '');
      throw new Error(`Translation API error: ${response.status} - ${errorData || response.statusText}`);
    }

    const data = await response.json();
    
    return {
      translatedText: data.translatedText || data.result || data,
      confidence: "0.95", // RapidAPI doesn't provide confidence scores
    };
  } catch (error) {
    throw new Error(`Translation service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Translation endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, sourceLanguage, targetLanguage } = translateRequestSchema.parse(req.body);
      
      if (sourceLanguage === targetLanguage) {
        return res.json({
          translatedText: text,
          confidence: "1.0",
        });
      }

      const result = await translateText(text, sourceLanguage, targetLanguage);
      
      // Save translation to storage
      await storage.saveTranslation({
        sourceText: text,
        translatedText: result.translatedText,
        sourceLanguage,
        targetLanguage,
        confidence: result.confidence,
      });

      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: error.errors 
        });
      }
      
      console.error("Translation error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Translation failed" 
      });
    }
  });

  // Get recent translations
  app.get("/api/translations/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const translations = await storage.getRecentTranslations(limit);
      res.json(translations);
    } catch (error) {
      console.error("Error fetching recent translations:", error);
      res.status(500).json({ message: "Failed to fetch recent translations" });
    }
  });

  // Language detection endpoint (simplified - return a basic detection)
  app.post("/api/detect-language", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Text is required" });
      }

      // Basic language detection based on character patterns
      // This is a simplified version - for production use a proper detection service
      let detectedLang = 'en'; // default
      
      if (/[\u4e00-\u9fff]/.test(text)) detectedLang = 'zh';
      else if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) detectedLang = 'ja';
      else if (/[\u0400-\u04ff]/.test(text)) detectedLang = 'ru';
      else if (/[\u0600-\u06ff]/.test(text)) detectedLang = 'ar';
      else if (/[àáâãäåæçèéêëìíîïñòóôõöøùúûüý]/.test(text.toLowerCase())) {
        if (text.includes('ñ')) detectedLang = 'es';
        else if (/[àáâãçéêíóôõúü]/.test(text.toLowerCase())) detectedLang = 'pt';
        else detectedLang = 'fr';
      }
      
      res.json({
        language: detectedLang,
        confidence: 0.8,
      });
    } catch (error) {
      console.error("Language detection error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Language detection failed" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
