import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Clipboard, Upload, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextInputCardProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function TextInputCard({ value, onChange, maxLength = 5000 }: TextInputCardProps) {
  const [charCount, setCharCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleClear = () => {
    onChange("");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text.slice(0, maxLength));
      toast({
        title: "Text pasted",
        description: "Text has been pasted from clipboard",
      });
    } catch (error) {
      toast({
        title: "Paste failed",
        description: "Could not paste from clipboard",
        variant: "destructive",
      });
    }
  };

  const isNearLimit = charCount > maxLength * 0.9;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slide-up">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Original Text</h3>
          <div className="flex items-center space-x-2">
            <span 
              className={`text-sm transition-colors ${
                isNearLimit ? 'text-red-500' : 'text-gray-500'
              }`}
              data-testid="text-char-count"
            >
              {charCount}/{maxLength}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              data-testid="button-clear-input"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full h-40 resize-none border-0 focus:ring-0 text-lg text-gray-900 placeholder-gray-400 leading-relaxed bg-transparent"
          maxLength={maxLength}
          data-testid="textarea-input-text"
        />
        
        {/* Input Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePaste}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              data-testid="button-paste-text"
            >
              <Clipboard className="h-4 w-4" />
              <span>Paste</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
              data-testid="button-upload-file"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
              data-testid="button-voice-input"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
