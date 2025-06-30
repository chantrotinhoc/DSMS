
import React, { useState, useEffect, useCallback } from 'react';
import { Node } from 'reactflow';
import { COMPONENT_DEFINITIONS } from '../constants';
import { X } from 'lucide-react';

interface PropertiesPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (nodeId: string, data: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ node, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(node.data.properties);
  const definition = COMPONENT_DEFINITIONS[node.data.componentType];

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: string) => {
    onUpdate(node.id, { [key]: formData[key] });
  };
  
  if (!definition) {
    return (
      <div className="p-4 text-gray-400">
        <p>No definition found for this component type.</p>
      </div>
    );
  }

  const { icon: Icon, name } = definition;

  return (
    <div className="h-full flex flex-col p-4 bg-gray-800 text-gray-200">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
        <div className="flex items-center space-x-3">
            <Icon className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-bold">{name} Properties</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        <form>
          {definition.properties.map((prop) => (
            <div key={prop.key} className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {prop.name}
              </label>
              {prop.type === 'textarea' ? (
                 <textarea
                    value={formData[prop.key] || ''}
                    onChange={(e) => handleInputChange(prop.key, e.target.value)}
                    onBlur={() => handleBlur(prop.key)}
                    rows={3}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                    type={prop.type}
                    value={formData[prop.key] || ''}
                    onChange={(e) => handleInputChange(prop.key, e.target.value)}
                    onBlur={() => handleBlur(prop.key)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default PropertiesPanel;
