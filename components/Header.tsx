
import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface HeaderProps {
  onToggleAIAssistant: () => void;
}

const ITSLogo: React.FC = () => (
    <div className="text-3xl font-bold tracking-wider">
      <span className="text-blue-400">IT</span><span className="text-gray-300">S</span>
    </div>
);

const Header: React.FC<HeaderProps> = ({ onToggleAIAssistant }) => {
  return (
    <header className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-700 shadow-md">
      <div className="flex items-center space-x-4">
        <ITSLogo />
        <h1 className="text-xl font-semibold text-gray-200">
          Digital System Management Service
        </h1>
      </div>
      <div className="flex items-center space-x-4">
         <button
          onClick={onToggleAIAssistant}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          AI Assistant
        </button>
      </div>
    </header>
  );
};

export default Header;
