import { Button } from "@/components/ui/button";

interface QuickPhrasesProps {
  onSelectPhrase: (phrase: string) => void;
}

const quickPhrases = [
  "Hello, how are you?",
  "Thank you very much",
  "Where is the bathroom?",
  "I don't understand",
  "Can you help me?",
  "How much does it cost?",
  "What time is it?",
  "Where is the nearest hospital?",
  "I need help",
  "Excuse me",
  "Please speak slowly",
  "I'm sorry",
];

export function QuickPhrases({ onSelectPhrase }: QuickPhrasesProps) {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Phrases</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickPhrases.map((phrase, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => onSelectPhrase(phrase)}
            className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-sm text-gray-700 hover:text-gray-900 h-auto justify-start"
            data-testid={`button-quick-phrase-${index}`}
          >
            {phrase}
          </Button>
        ))}
      </div>
    </div>
  );
}
