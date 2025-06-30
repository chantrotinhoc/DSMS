
import React, { useState } from 'react';
import { COMPONENT_DEFINITIONS } from '../constants';
import { ComponentCategory, ComponentType, ITComponent } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

const DraggableComponent: React.FC<{ component: ITComponent }> = ({ component }) => {
  const onDragStart = (event: React.DragEvent, componentType: ComponentType) => {
    event.dataTransfer.setData('application/reactflow', componentType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex items-center p-2 mb-2 bg-gray-700 rounded-md cursor-grab hover:bg-gray-600 transition-colors duration-150"
      onDragStart={(event) => onDragStart(event, component.type)}
      draggable
    >
      <component.icon className="h-5 w-5 mr-3 text-blue-400" />
      <span className="text-sm font-medium">{component.name}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    [ComponentCategory.NETWORK]: true,
    [ComponentCategory.SERVER_STORAGE]: true,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };
  
  const componentsByCategory = Object.values(COMPONENT_DEFINITIONS).reduce((acc, comp) => {
    (acc[comp.category] = acc[comp.category] || []).push(comp);
    return acc;
  }, {} as Record<ComponentCategory, ITComponent[]>);

  return (
    <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-300">Components</h2>
      {Object.entries(componentsByCategory).map(([category, components]) => (
        <div key={category} className="mb-4">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex justify-between items-center text-left text-md font-semibold text-gray-300 hover:text-white mb-2"
          >
            {category}
            {openCategories[category] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {openCategories[category] && (
            <div className="pl-2 border-l-2 border-gray-600">
              {components.map((component) => (
                <DraggableComponent key={component.type} component={component} />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
