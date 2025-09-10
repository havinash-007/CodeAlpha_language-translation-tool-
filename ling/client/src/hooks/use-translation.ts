import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Translation, TranslateRequest } from "@shared/schema";

interface TranslationResponse {
  translatedText: string;
  confidence?: string;
}

interface DetectionResponse {
  language: string;
  confidence: number;
}

export function useTranslation() {
  const queryClient = useQueryClient();

  const translateMutation = useMutation({
    mutationFn: async (request: TranslateRequest): Promise<TranslationResponse> => {
      const response = await apiRequest("POST", "/api/translate", request);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate recent translations to refresh the history
      queryClient.invalidateQueries({ queryKey: ["/api/translations/recent"] });
    },
  });

  const detectLanguageMutation = useMutation({
    mutationFn: async (text: string): Promise<DetectionResponse> => {
      const response = await apiRequest("POST", "/api/detect-language", { text });
      return response.json();
    },
  });

  return {
    translate: translateMutation.mutate,
    translateAsync: translateMutation.mutateAsync,
    isTranslating: translateMutation.isPending,
    translationError: translateMutation.error,
    detectLanguage: detectLanguageMutation.mutate,
    detectLanguageAsync: detectLanguageMutation.mutateAsync,
    isDetecting: detectLanguageMutation.isPending,
    detectionError: detectLanguageMutation.error,
  };
}

export function useRecentTranslations() {
  return useQuery<Translation[]>({
    queryKey: ["/api/translations/recent"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
