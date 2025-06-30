
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
  NodeTypes,
} from 'reactflow';
import { ComponentType, PanelType } from './types';
import { COMPONENT_DEFINITIONS } from './constants';
import { SAMPLE_DATA } from './sampleData';
import Sidebar from './components/Sidebar';
import PropertiesPanel from './components/PropertiesPanel';
import AIAssistantPanel from './components/AIAssistantPanel';
import Header from './components/Header';
import CustomNode from './components/CustomNode';

const nodeTypes: NodeTypes = {
  default: CustomNode, // Override the default node renderer with our custom one
};

let id = 1;
const getId = () => `dndnode_${id++}`;

const App: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.CLOSED);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#60a5fa', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow') as ComponentType;
      
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const definition = COMPONENT_DEFINITIONS[type];
      if(!definition) return;

      const sampleProperties = SAMPLE_DATA[type] || {};
      const initialProperties = Object.fromEntries(
        definition.properties.map(p => [p.key, sampleProperties[p.key] || ''])
      );

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type: 'default', // This will use CustomNode because we've overridden it
        position,
        data: { 
          label: definition.name,
          componentType: type,
          properties: initialProperties,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setActivePanel(PanelType.PROPERTIES);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    // Do not close the AI panel when clicking the pane
    if (activePanel !== PanelType.AI) {
      setActivePanel(PanelType.CLOSED);
    }
  }, [activePanel]);

  const updateNodeData = (nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              properties: { ...node.data.properties, ...newData }
            },
          };
          // Also update the selected node in state if it's the one being edited
          if (selectedNode && selectedNode.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  };

  const toggleAIPanel = () => {
    if (activePanel === PanelType.AI) {
      setActivePanel(PanelType.CLOSED);
    } else {
      setActivePanel(PanelType.AI);
      setSelectedNode(null);
    }
  };


  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-100">
      <Header onToggleAIAssistant={toggleAIPanel} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            className="bg-gray-800"
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background color="#4a5568" gap={16} />
          </ReactFlow>
        </main>
        <aside className={`transition-all duration-300 ease-in-out bg-gray-800 border-l border-gray-700 shadow-2xl ${activePanel !== PanelType.CLOSED ? 'w-96' : 'w-0' } overflow-hidden`}>
           <div className="h-full w-96">
            {activePanel === PanelType.PROPERTIES && selectedNode && (
              <PropertiesPanel 
                key={selectedNode.id} 
                node={selectedNode}
                onClose={() => setActivePanel(PanelType.CLOSED)}
                onUpdate={updateNodeData} 
              />
            )}
            {activePanel === PanelType.AI && (
              <AIAssistantPanel 
                nodes={nodes} 
                edges={edges}
                onClose={() => setActivePanel(PanelType.CLOSED)}
              />
            )}
           </div>
        </aside>
      </div>
    </div>
  );
};

export default App;