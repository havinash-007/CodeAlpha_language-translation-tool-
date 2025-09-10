import { Languages, History, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TranslationInterface } from "@/components/translation-interface";

export default function Home() {
  return (
    <div className="bg-gray-50 font-inter min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Languages className="text-white text-xl h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Universal Translator</h1>
                <p className="text-sm text-gray-500">Instant language translation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="button-history"
              >
                <History className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="button-settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <TranslationInterface />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Universal Translator</h4>
              <p className="text-gray-600 text-sm">
                Breaking language barriers with instant, accurate translations powered by advanced AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>100+ Languages supported</li>
                <li>Voice input & output</li>
                <li>Document translation</li>
                <li>Real-time translation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 transition-colors">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; 2024 Universal Translator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
