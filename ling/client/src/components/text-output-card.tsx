import { Button } from "@/components/ui/button";
import { Copy, Download, Volume2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextOutputCardProps {
  value: string;
  isLoading: boolean;
  confidence?: string;
}

export function TextOutputCard({ value, isLoading, confidence }: TextOutputCardProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: "Translation copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Translation downloaded as text file",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Translation',
          text: value,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const confidenceScore = confidence ? Math.round(parseFloat(confidence) * 100) : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slide-up">
      <div className="p-4 bg-primary-50 border-b border-primary-100">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Translation</h3>
          <div className="flex items-center space-x-2">
            {confidenceScore && (
              <span 
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                data-testid="text-confidence-score"
              >
                {confidenceScore}% confidence
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="w-full h-40 flex items-center justify-center" data-testid="loading-translation">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent"></div>
              <span className="text-gray-600">Translating...</span>
            </div>
          </div>
        ) : (
          <div 
            className="w-full h-40 text-lg text-gray-900 leading-relaxed overflow-y-auto"
            data-testid="text-translation-output"
          >
            {value || (
              <span className="text-gray-400 italic">Translation will appear here...</span>
            )}
          </div>
        )}
        
        {/* Output Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!value || isLoading}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
              data-testid="button-copy-translation"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              disabled={!value || isLoading}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
              data-testid="button-download-translation"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={!value || isLoading}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all disabled:opacity-50"
              data-testid="button-play-audio"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              disabled={!value || isLoading}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all disabled:opacity-50"
              data-testid="button-share-translation"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
