
import React, { useState, useEffect } from 'react';
import { Node, Edge } from 'reactflow';
import { Sparkles, X, Send, FileText, Wrench, Lightbulb } from 'lucide-react';
import { generateSystemReport, getImprovementSuggestions, getTroubleshootingSteps } from '../services/geminiService';
import { COMPONENT_DEFINITIONS } from '../constants';

interface AIAssistantPanelProps {
  nodes: Node[];
  edges: Edge[];
  onClose: () => void;
}

type AITask = 'report' | 'suggest' | 'troubleshoot' | null;

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ nodes, edges, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [currentTask, setCurrentTask] = useState<AITask>(null);
  const [userInput, setUserInput] = useState('');

  const getDiagramData = () => {
    const diagramNodes = nodes.map(node => ({
      id: node.id,
      type: node.data.componentType,
      name: COMPONENT_DEFINITIONS[node.data.componentType]?.name || 'Unknown',
      properties: node.data.properties
    }));
    const diagramEdges = edges.map(edge => ({
      source: edge.source,
      target: edge.target
    }));
    return { nodes: diagramNodes, edges: diagramEdges };
  };

  const handleTask = async (task: AITask) => {
    if (isLoading) return;
    setIsLoading(true);
    setResponse('');
    setCurrentTask(task);
    
    try {
      const diagramData = getDiagramData();
      let stream;

      if (task === 'report') {
        stream = await generateSystemReport(diagramData);
      } else if (task === 'suggest') {
        stream = await getImprovementSuggestions(diagramData);
      } else if (task === 'troubleshoot') {
        if (!userInput) {
          setResponse('Please describe the problem to troubleshoot.');
          setIsLoading(false);
          return;
        }
        stream = await getTroubleshootingSteps(diagramData, userInput);
      }

      if (stream) {
        let fullResponse = '';
        for await (const chunk of stream) {
          const chunkText = chunk.text;
          if (chunkText) {
            fullResponse += chunkText;
            setResponse(fullResponse);
          }
        }
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setResponse("Sorry, I encountered an error. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-gray-800 text-gray-200">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Sparkles className="h-6 w-6 text-blue-400" />
          <h3 className="text-lg font-bold">AI Assistant</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <button onClick={() => handleTask('report')} disabled={isLoading} className="flex-1 flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors disabled:opacity-50">
          <FileText size={16} className="mr-2"/> Report
        </button>
        <button onClick={() => handleTask('suggest')} disabled={isLoading} className="flex-1 flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors disabled:opacity-50">
          <Lightbulb size={16} className="mr-2"/> Suggest
        </button>
      </div>
      
      <div className="flex flex-col space-y-2 mb-4">
         <div className="flex items-center text-gray-400 font-semibold"><Wrench size={16} className="mr-2"/> Troubleshoot</div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe a problem, e.g., 'Users cannot access the cloud server...'"
          rows={3}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button onClick={() => handleTask('troubleshoot')} disabled={isLoading || !userInput} className="flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Send size={16} className="mr-2"/> Get Help
        </button>
      </div>

      <div className="flex-grow overflow-y-auto bg-gray-900 rounded-md p-3 border border-gray-700 prose prose-invert prose-sm max-w-none">
        {isLoading && <div className="text-center p-4">Thinking...</div>}
        {response && <div dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }} />}
         {!isLoading && !response && (
          <div className="text-gray-500 text-center p-4">
            Select a task above or describe a problem to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;
