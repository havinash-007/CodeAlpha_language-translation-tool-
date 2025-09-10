import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useRecentTranslations } from "@/hooks/use-translation";
import { getLanguageName } from "@/lib/languages";
import { formatDistanceToNow } from "date-fns";

interface RecentTranslationsProps {
  onReuseTranslation: (sourceText: string, sourceLanguage: string, targetLanguage: string) => void;
}

export function RecentTranslations({ onReuseTranslation }: RecentTranslationsProps) {
  const { data: translations = [], isLoading } = useRecentTranslations();

  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Translations</h3>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (translations.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Translations</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No recent translations yet</p>
          <p className="text-sm text-gray-400 mt-1">Your translation history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Translations</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          data-testid="button-clear-history"
        >
          Clear all
        </Button>
      </div>
      
      <div className="space-y-3">
        {translations.map((translation) => (
          <div
            key={translation.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            data-testid={`translation-item-${translation.id}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                <span>{getLanguageName(translation.sourceLanguage)}</span>
                <ArrowRight className="h-3 w-3" />
                <span>{getLanguageName(translation.targetLanguage)}</span>
                <span className="mx-2">•</span>
                <span>{formatDistanceToNow(new Date(translation.createdAt), { addSuffix: true })}</span>
              </div>
              <p className="text-sm text-gray-900 truncate">
                {translation.sourceText} → {translation.translatedText}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReuseTranslation(
                translation.sourceText,
                translation.sourceLanguage,
                translation.targetLanguage
              )}
              className="ml-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              data-testid={`button-reuse-translation-${translation.id}`}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
