import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages, ArrowRight } from "lucide-react";
import { LanguageSelector } from "./language-selector";
import { TextInputCard } from "./text-input-card";
import { TextOutputCard } from "./text-output-card";
import { QuickPhrases } from "./quick-phrases";
import { RecentTranslations } from "./recent-translations";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";

export function TranslationInterface() {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [confidence, setConfidence] = useState<string | undefined>();

  const { translate, isTranslating, translationError } = useTranslation();
  const { toast } = useToast();

  const handleSwapLanguages = () => {
    if (sourceLanguage === "auto") return;
    
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    
    // Also swap the text content
    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text to translate",
        variant: "destructive",
      });
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast({
        title: "Same languages selected",
        description: "Please select different source and target languages",
        variant: "destructive",
      });
      return;
    }

    translate(
      {
        text: inputText,
        sourceLanguage,
        targetLanguage,
      },
      {
        onSuccess: (result) => {
          setTranslatedText(result.translatedText);
          setConfidence(result.confidence);
          toast({
            title: "Translation complete",
            description: "Text has been successfully translated",
          });
        },
        onError: (error) => {
          console.error("Translation error:", error);
          toast({
            title: "Translation failed",
            description: error.message || "An error occurred during translation",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleSelectQuickPhrase = (phrase: string) => {
    setInputText(phrase);
  };

  const handleReuseTranslation = (sourceText: string, sourceLang: string, targetLang: string) => {
    setInputText(sourceText);
    setSourceLanguage(sourceLang);
    setTargetLanguage(targetLang);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LanguageSelector
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onSourceLanguageChange={setSourceLanguage}
        onTargetLanguageChange={setTargetLanguage}
        onSwapLanguages={handleSwapLanguages}
      />

      {/* Translation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextInputCard
          value={inputText}
          onChange={setInputText}
        />
        
        <TextOutputCard
          value={translatedText}
          isLoading={isTranslating}
          confidence={confidence}
        />
      </div>

      {/* Translate Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleTranslate}
          disabled={isTranslating || !inputText.trim()}
          className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
          data-testid="button-translate"
        >
          <Languages className="h-5 w-5 group-hover:animate-pulse" />
          <span>{isTranslating ? "Translating..." : "Translate"}</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <QuickPhrases onSelectPhrase={handleSelectQuickPhrase} />
      
      <RecentTranslations onReuseTranslation={handleReuseTranslation} />
    </main>
  );
}
