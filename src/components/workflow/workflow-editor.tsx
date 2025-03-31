'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Node,
  Edge,
  Connection,
  NodeTypes,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { AgentNode } from './nodes/agent-node';
import { ToolNode } from './nodes/tool-node';
import { ConditionNode } from './nodes/condition-node';

const nodeTypes: NodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  condition: ConditionNode,
};

// 初始节点示例
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'agent',
    position: { x: 250, y: 25 },
    data: { 
      label: 'AI代理',
      name: '客服助手',
      model: 'gpt-4',
      description: '处理用户查询的AI助手' 
    },
  },
  {
    id: '2',
    type: 'tool',
    position: { x: 100, y: 200 },
    data: { 
      label: '工具节点',
      name: '查询知识库',
      description: '在知识库中查找相关信息' 
    },
  },
  {
    id: '3',
    type: 'condition',
    position: { x: 400, y: 200 },
    data: { 
      label: '条件节点',
      name: '满意度判断',
      condition: 'satisfaction > 0.7',
      description: '判断用户是否满意' 
    },
  },
];

// 初始连线示例
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

interface WorkflowEditorProps {
  workflowId?: string;
}

export function WorkflowEditor({ workflowId }: WorkflowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );

  const addNewNode = (type: string) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: type === 'agent' ? 'AI代理' : type === 'tool' ? '工具节点' : '条件节点',
        name: `新${type === 'agent' ? 'AI代理' : type === 'tool' ? '工具' : '条件'}`,
        description: '描述...',
        ...(type === 'agent' ? { model: 'gpt-4' } : {}),
        ...(type === 'condition' ? { condition: '' } : {})
      },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="border rounded-md h-[700px] w-full flex">
      <div className="flex-grow reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
        >
          <Background variant="dots" gap={12} size={1} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <div className="w-72 border-l p-4 bg-muted/10 overflow-auto">
        <h3 className="font-medium mb-4">工作流节点</h3>
        <div className="grid gap-3 mb-6">
          <button
            onClick={() => addNewNode('agent')}
            className="px-3 py-2 border rounded-md text-sm bg-blue-50 hover:bg-blue-100 text-blue-700"
          >
            添加AI代理节点
          </button>
          <button
            onClick={() => addNewNode('tool')}
            className="px-3 py-2 border rounded-md text-sm bg-green-50 hover:bg-green-100 text-green-700"
          >
            添加工具节点
          </button>
          <button
            onClick={() => addNewNode('condition')}
            className="px-3 py-2 border rounded-md text-sm bg-orange-50 hover:bg-orange-100 text-orange-700"
          >
            添加条件节点
          </button>
        </div>
        
        {selectedNode && (
          <div>
            <h3 className="font-medium mb-2">节点属性</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1">名称</label>
                <input
                  className="w-full px-3 py-1 border rounded-md text-sm"
                  value={selectedNode.data.name || ''}
                  onChange={(e) => {
                    const updatedNodes = nodes.map((n) => {
                      if (n.id === selectedNode.id) {
                        return {
                          ...n,
                          data: {
                            ...n.data,
                            name: e.target.value,
                          },
                        };
                      }
                      return n;
                    });
                    setNodes(updatedNodes);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">描述</label>
                <textarea
                  className="w-full px-3 py-1 border rounded-md text-sm"
                  rows={3}
                  value={selectedNode.data.description || ''}
                  onChange={(e) => {
                    const updatedNodes = nodes.map((n) => {
                      if (n.id === selectedNode.id) {
                        return {
                          ...n,
                          data: {
                            ...n.data,
                            description: e.target.value,
                          },
                        };
                      }
                      return n;
                    });
                    setNodes(updatedNodes);
                  }}
                />
              </div>
              {selectedNode.type === 'agent' && (
                <div>
                  <label className="block text-xs mb-1">模型</label>
                  <select
                    className="w-full px-3 py-1 border rounded-md text-sm"
                    value={selectedNode.data.model || 'gpt-4'}
                    onChange={(e) => {
                      const updatedNodes = nodes.map((n) => {
                        if (n.id === selectedNode.id) {
                          return {
                            ...n,
                            data: {
                              ...n.data,
                              model: e.target.value,
                            },
                          };
                        }
                        return n;
                      });
                      setNodes(updatedNodes);
                    }}
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  </select>
                </div>
              )}
              {selectedNode.type === 'condition' && (
                <div>
                  <label className="block text-xs mb-1">条件表达式</label>
                  <input
                    className="w-full px-3 py-1 border rounded-md text-sm"
                    value={selectedNode.data.condition || ''}
                    onChange={(e) => {
                      const updatedNodes = nodes.map((n) => {
                        if (n.id === selectedNode.id) {
                          return {
                            ...n,
                            data: {
                              ...n.data,
                              condition: e.target.value,
                            },
                          };
                        }
                        return n;
                      });
                      setNodes(updatedNodes);
                    }}
                  />
                </div>
              )}
              <button
                className="px-3 py-1 border rounded-md text-sm text-red-600 hover:bg-red-50"
                onClick={() => {
                  setNodes(nodes.filter((n) => n.id !== selectedNode.id));
                  setEdges(edges.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
                  setSelectedNode(null);
                }}
              >
                删除节点
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 