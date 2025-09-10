import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { languages, getLanguageName } from "@/lib/languages";

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceLanguageChange: (value: string) => void;
  onTargetLanguageChange: (value: string) => void;
  onSwapLanguages: () => void;
}

export function LanguageSelector({
  sourceLanguage,
  targetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onSwapLanguages,
}: LanguageSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Source Language */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <Select value={sourceLanguage} onValueChange={onSourceLanguageChange}>
            <SelectTrigger 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white text-gray-900"
              data-testid="select-source-language"
            >
              <SelectValue placeholder="Select source language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Languages Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSwapLanguages}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all transform hover:scale-105 focus:ring-2 focus:ring-primary-500"
            data-testid="button-swap-languages"
            disabled={sourceLanguage === "auto"}
          >
            <ArrowLeftRight className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Target Language */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
            <SelectTrigger 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white text-gray-900"
              data-testid="select-target-language"
            >
              <SelectValue placeholder="Select target language" />
            </SelectTrigger>
            <SelectContent>
              {languages.filter(lang => lang.code !== "auto").map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
