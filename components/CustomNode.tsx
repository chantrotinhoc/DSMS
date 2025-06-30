import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { COMPONENT_DEFINITIONS } from '../constants';
import { ComponentType } from '../types';

const CustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  const { componentType, properties } = data;
  const definition = COMPONENT_DEFINITIONS[componentType as ComponentType];

  if (!definition) {
    return (
        <div className="p-3 bg-red-800 rounded-lg border-2 border-red-500 text-white w-48">
            Unknown Component
        </div>
    );
  }

  // Determine which key properties to display on the node
  const keyProperties: string[] = [];
  switch (componentType) {
    case ComponentType.FIREWALL:
    case ComponentType.ROUTER:
      keyProperties.push('deviceName');
      keyProperties.push('ipLan'); // Corrected from 'ip'
      break;
    case ComponentType.PHYSICAL_SERVER:
    case ComponentType.VIRTUAL_SERVER:
      keyProperties.push('deviceName');
      keyProperties.push('ip');
      break;
    case ComponentType.CLOUD_SERVER:
      keyProperties.push('deviceName');
      keyProperties.push('ipLan'); // Corrected from 'ip'
      break;
    case ComponentType.NAS:
      keyProperties.push('deviceName');
      keyProperties.push('ipPort'); // Corrected from 'ip'
      break;
    case ComponentType.USER_INFO:
      keyProperties.push('fullName');
      keyProperties.push('department');
      break;
    case ComponentType.LAPTOP:
    case ComponentType.DESKTOP:
      keyProperties.push('userAccount');
      keyProperties.push('ip');
      break;
    case ComponentType.INTERNET:
        keyProperties.push('provider');
        keyProperties.push('ipWan');
        break;
    case ComponentType.SWITCH:
        keyProperties.push('deviceName');
        keyProperties.push('ip');
        break;
    case ComponentType.VPN:
        keyProperties.push('systemName');
        break;
    case ComponentType.PRINTER:
        keyProperties.push('model');
        keyProperties.push('ip');
        break;
    default:
        if (definition.properties.some(p => p.key === 'deviceName')) {
            keyProperties.push('deviceName');
        } else if (definition.properties.some(p => p.key === 'model')) {
            keyProperties.push('model');
        }
        break;
  }

  const getPropertyDisplay = (key: string) => {
      const propDef = definition.properties.find(p => p.key === key);
      const value = properties[key];
      // Display only if the property is defined for the component and has a value
      if (propDef && value) {
          return (
              <div key={key} className="text-xs text-gray-300 truncate" title={`${propDef.name}: ${value}`}>
                  <span className="font-semibold text-gray-400">{propDef.name}:</span> {value}
              </div>
          )
      }
      return null;
  }
  
  const borderColor = selected ? 'border-blue-500' : 'border-gray-600';
  const ringColor = selected ? 'ring-2 ring-blue-500 ring-opacity-50' : '';

  return (
    <div className={`bg-gray-700/80 backdrop-blur-sm border-2 ${borderColor} rounded-lg p-3 text-white shadow-xl w-48 transition-all duration-150 ${ringColor}`}>
      <Handle type="target" position={Position.Top} className="!bg-blue-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
      
      <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-gray-600">
        <definition.icon className="h-6 w-6 text-blue-400 flex-shrink-0" />
        <span className="font-bold text-md truncate" title={definition.name}>{definition.name}</span>
      </div>
      
      <div className="space-y-1 min-h-[2.5rem]">
        {keyProperties.map(key => getPropertyDisplay(key))}
      </div>
    </div>
  );
};

export default CustomNode;
